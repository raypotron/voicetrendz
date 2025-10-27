FROM php:8.2-fpm-alpine

# Install system packages and PHP extensions
RUN apk add --no-cache \
    icu-dev \
    libzip-dev \
    freetype-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    oniguruma-dev \
    bash \
    nginx \
    supervisor \
    && docker-php-ext-configure gd \
        --with-freetype=/usr/include/ \
        --with-jpeg=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql zip intl bcmath mbstring

# Set working directory
WORKDIR /var/www/html

# Copy application code
COPY --from=vendor /app/vendor/ ./vendor/
COPY --from=frontend /app/public/build/ ./public/build/
COPY . .

# Copy configuration files
COPY .docker/nginx.conf /etc/nginx/nginx.conf
COPY .docker/php-fpm-www.conf /usr/local/etc/php-fpm.d/www.conf
COPY .docker/start.sh /usr/local/bin/start.sh

# Set permissions
RUN chmod +x /usr/local/bin/start.sh \
    && chown -R www-data:www-data /var/www/html

EXPOSE 80
CMD ["/usr/local/bin/start.sh"]
