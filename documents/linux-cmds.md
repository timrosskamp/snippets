# Linux Commands

Modify File Permissions Recursively

```bash
sudo find . -type d -exec chmod 775 {} ";"
```

Modify Folder Permissions Recursively

```bash
sudo find . -type f -exec chmod 664 {} ";"
```

Add existing User to an existing Group

```bash
sudo usermod -a -G [group] [user]
```

Change User & Group Recursively

```bash
sudo chown -R www-data:www-data .
```

Enable .htaccess

```bash
sudo a2enmod rewrite
```
