#!/bin/sh

# Set script to exit on any error
set -e

# Run production optimizations
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan storage:link

# Run database migrations
php artisan migrate --force

# Start the Nginx server in the background
nginx

# Start the PHP-FPM process in the foreground. This becomes the main container process.
exec /usr/local/sbin/php-fpm