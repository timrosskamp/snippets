# Setup for my server

1. `sudo apt update`
2. `sudo apt upgrade -y`

## Node.js

1. Download install script: `curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh`
2. Setup nodesource: `sudo bash nodesource_setup.sh`
3. Install Node.js: `sudo apt install nodejs`


## Apache2

1. Install Apache2: `sudo apt install apache2`
2. Enable Modules:
    * `sudo a2enmod rewrite`
    * `sudo a2enmod ssl`
