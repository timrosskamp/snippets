# php

## Singleton class pattern

```php
class Foo {

  public static $instance;
  
  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  protected function __construct() { }
  
  /**
   * Singletons should not be cloneable.
   */
  protected function __clone() { }
  
  /**
   * Singletons should not be restorable from strings.
   */
  public function __wakeup() {
    throw new \Exception("Cannot unserialize a singleton.");
  }

  public static function init() {
    self::$instance = new self();
  }
  
  public bar() {
    return 'whatever';
  }
  
}

Foo::init();


echo Foo::$instance->bar();
```
