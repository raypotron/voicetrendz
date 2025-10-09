# Stage 1: Composer dependencies
FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --ignore-platform-reqs --no-interaction --no-plugins --no-scripts --prefer-dist

# Stage 2: Frontend build
FROM node:20-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY vite.config.* ./
COPY postcss.config.* ./
COPY tailwind.config.* ./
COPY tsconfig.* ./
COPY resources/ ./resources/
COPY public/ ./public/
COPY .env .env
RUN npm run build

# Stage 3: Final image
FROM php:8.2-fpm-alpine

RUN apk add --no-cache \
    nginx supervisor libzip-dev libpng-dev jpeg-dev freetype-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql zip

WORKDIR /var/www/html

COPY --from=vendor /app/vendor/ ./vendor/
COPY --from=frontend /app/public/build/ ./public/build/
COPY . .

COPY .docker/nginx.conf /etc/nginx/nginx.conf
COPY .docker/php-fpm-www.conf /usr/local/etc/php-fpm.d/www.conf
COPY .docker/start.sh /usr/local/bin/start.sh

RUN chmod +x /usr/local/bin/start.sh \
    && chown -R www-data:www-data /var/www/html

EXPOSE 80
CMD ["/usr/local/bin/start.sh"]
