#!/bin/sh

# Set script to exit on any error
set -e

# --- Ensure Nginx temp folder exists and is writable ---
mkdir -p /tmp/nginx/client_body
chmod 777 /tmp/nginx/client_body

# Ensure PHP temp folder is writable (for Livewire/Filament)
chmod 1777 /tmp
# --- End temp folders setup ---

# Run production optimizations
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize:clear
php artisan storage:link

# Run database migrations
php artisan migrate --force

echo "Running seeder files..."
php artisan db:seed --force

# Start the Nginx server in the background
nginx

# Start the PHP-FPM process in the foreground. This becomes the main container process.
exec /usr/local/sbin/php-fpm
