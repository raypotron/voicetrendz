# Stage 1: Install PHP dependencies with Composer
FROM composer:2 as vendor

WORKDIR /app
COPY database/ database/
COPY composer.json composer.json
COPY composer.lock composer.lock
RUN composer install --ignore-platform-reqs --no-interaction --no-plugins --no-scripts --prefer-dist

# Stage 2: Build frontend assets with Node.js
FROM node:20-alpine as frontend

WORKDIR /app
COPY package.json package.json
# COPY yarn.lock yarn.lock
# Or copy package-lock.json if you use npm
COPY package-lock.json package-lock.json
COPY vite.config.ts vite.config.ts
# COPY tailwind.config.js tailwind.config.js
# COPY postcss.config.js postcss.config.js
COPY resources/ resources/
# RUN yarn install
# Or run npm install
RUN npm install
# RUN yarn build
# Or run npm run build
RUN npm run build


# Stage 3: Final production image
FROM php:8.2-fpm-alpine

# Install system dependencies for Laravel (gd, pdo_mysql, pdo_pgsql, etc.) and Supervisor
RUN apk add --no-cache \
    curl \
    icu-dev \
    libzip-dev \
    freetype-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    oniguruma-dev \
    bash \
    nginx \
    supervisor \
    openssl \
    && docker-php-ext-configure gd \
    --with-freetype=/usr/include/ \
    --with-jpeg=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql zip intl bcmath

# --- ADD THIS BLOCK AFTER INSTALLING NGINX ---
# Create Nginx client_body temp directory and fix permissions

RUN mkdir -p /tmp/nginx/client_body \
    && chmod -R 777 /tmp/nginx

# Ensure PHP temp folder is writable (Livewire / Filament uploads)
RUN chmod 1777 /tmp
# --- END BLOCK ---

WORKDIR /var/www/html

# Copy application code and compiled assets
COPY --from=vendor /app/vendor/ /var/www/html/vendor/
COPY --from=frontend /app/public/build/ /var/www/html/public/build/
COPY . .

# Copy configurations for Nginx, Supervisor, and the start script
COPY .docker/nginx.conf /etc/nginx/nginx.conf
COPY .docker/php-fpm-www.conf /usr/local/etc/php-fpm.d/www.conf
COPY .docker/start.sh /usr/local/bin/start.sh

# Set permissions
RUN chmod +x /usr/local/bin/start.sh \
    && chown -R www-data:www-data /var/www/html

EXPOSE 80

# The command to start the container
CMD ["/usr/local/bin/start.sh"]

