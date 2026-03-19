FROM debian:trixie-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    nodejs \
    npm \
    --no-install-recommends

# Install PHP 8.4 from Debian repository (previously 8.5 but not in repo)
RUN apt-get install -y php8.4 php8.4-cli php8.4-common php8.4-mbstring php8.4-xml php8.4-curl \
    php8.4-mysql php8.4-zip php8.4-gd php8.4-pdo php8.4-pdo-mysql php-sqlite3

# Install Composer from official installer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Laravel globally
RUN composer global require laravel/installer

#Copy php.ini file to container image
#COPY php.ini /usr/local/etc/php/php.ini   
COPY php-custom.ini /usr/local/etc/php/conf.d/custom.ini 

# Add Composer's global bin to PATH
ENV PATH="/root/.composer/vendor/bin:${PATH}"

WORKDIR /workspace

#to keep container running indefinetly
CMD ["sleep", "infinity"]
# OR CMD ["tail", "-f", "/dev/null"]