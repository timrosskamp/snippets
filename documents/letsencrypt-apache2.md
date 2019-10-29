# Setup Let's Encrypt with apache

## Prerequisites

- Debian 10 (Buster)
- SSH Access
- sudo Permissions

## Certbot setup

Install certbot:
`sudo apt-get install certbot python-certbot-apache`

Get Certificates for apache:
`sudo certbot certonly --apache`

## Apache Configuration

[ssl-config.mozilla.org](https://ssl-config.mozilla.org)

Enable Apache SSL Module: `sudo a2enmod ssl`

```
<VirtualHost *:80>
    ServerName subdomain.example.com
    DocumentRoot /path/to/webroot/subdomain.example.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName subdomain.example.com
    DocumentRoot /path/to/webroot/subdomain.example.com/

    SSLEngine on
    SSLCertificateFile    /etc/letsencrypt/live/subdomain.example.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/subdomain.example.com/privkey.pem
</VirtualHost>


SSLProtocol             all -SSLv3 -TLSv1 -TLSv1.1
SSLCipherSuite          ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384
SSLHonorCipherOrder     off
SSLSessionTickets       off

SSLUseStapling On
SSLStaplingCache "shmcb:logs/ssl_stapling(32768)"
```
