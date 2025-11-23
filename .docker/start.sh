#!/bin/sh

set -e

# Ensure nginx temp folders exist
mkdir -p /tmp/nginx/client_body
chmod 777 /tmp/nginx/client_body

# Ensure PHP temp folders exist
chmod 1777 /tmp

# Laravel optimizations
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan storage:link
php artisan migrate --force
php artisan db:seed --force

# Start Supervisor (this runs BOTH nginx + php-fpm in foreground)
exec /usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf
