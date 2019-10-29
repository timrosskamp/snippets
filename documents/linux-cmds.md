# Linux Commands

Modify File Permissions Recursively: `sudo find . -type d -exec chmod 775 {} ";"`

Modify Folder Permissions Recursively: `sudo find . -type f -exec chmod 664 {} ";"`

Add existing User to an existing Group: `sudo usermod -a -G [group] [user]`

Change User & Group Recursively: `sudo chown -R www-data:www-data .`

Enable .htaccess: `sudo a2enmod rewrite`
