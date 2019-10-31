# Setup for my server

1. `sudo apt update`
2. `sudo apt upgrade -y`

## Software

### Node.js

1. Download install script: `curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh`
2. Setup nodesource: `sudo bash nodesource_setup.sh`
3. Install Node.js: `sudo apt install nodejs`

### PHP

1. Install required PHP Packages: `sudo apt install php php-common libapache2-mod-php`
2. Install PHP Extensions: `sudo apt install php-cli php-fpm php-json php-pdo php-mysql php-zip php-gd  php-mbstring php-curl php-xml php-pear php-bcmath`

### Apache2

1. Install Apache2: `sudo apt install apache2`
2. Enable Modules:
    * `sudo a2enmod rewrite`
    * `sudo a2enmod ssl`

## Links

* [How To Install Node.js on Debian 10 (digitalocean.com)](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-debian-10)
* [How To Install Linux, Apache, MariaDB, PHP (LAMP) stack on Debian 10 (digitalocean.com)](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mariadb-php-lamp-stack-on-debian-10)
