#!/usr/bin/env bash
echo "Running composer"
composer install --no-dev --working-dir=/var/www/html

# echo "generating application key..."
# php artisan key:generate --show

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

# echo "Composer dump..."
# composer dump-autoload

echo "Caching optimize..."
php artisan optimize:clear

# echo "Route list..."
# php artisan route:list

echo "Running migrations..."
php artisan migrate:fresh --force

# echo "Creating Permissions..."
# php artisan permission:create-permission-routes

echo "Running seeder files..."
php artisan db:seed --force
# php artisan db:seed --class=CentralAdminSeeder --force

# echo "Run php worker..."
# php artisan queue:work
