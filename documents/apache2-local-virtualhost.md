# apache2 VirtualHost - Local Domain

Create a new Config for a VirtualHost

```bash
cd /etc/apache2/sites-available/
sudo nano example.local.conf
```

Example Configuration:

```bash
<VirtualHost *:80>
    ServerName example.local
    ServerAlias www.example.local
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/example-dev
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Activate new Config

```bash
sudo a2ensite example.local.conf
```

Restart Apache

```bash
sudo service apache2 restart
```

Add Hostname (on Linux)

```bash
sudo nano /etc/hosts
```

Add this to the file:

```bash
127.0.0.1 example.local
```
