## Fix: Access denied for user 'root'@'localhost'

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'NewPassword';

update mysql.user set authentication_string=password('NewPassword') where User='root';

update mysql.user set plugin='mysql_native_password' where User='root';
```
