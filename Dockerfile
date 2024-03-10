# Dockerfile.php

# Use the official PHP with Apache image
FROM php:8.0-apache

# Install MySQLi extension
RUN docker-php-ext-install mysqli

# Enable mod_rewrite
RUN a2enmod rewrite

# Restart Apache
RUN service apache2 restart
