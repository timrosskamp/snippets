function array_every( array $array, callable $fn ){
    foreach( $array as $value ){
        if( !$fn($value) ){
            return false;
        }
    }
    return true;
}
