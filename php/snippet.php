/**
 * Embeds a snippet
 *
 * @param string|array $file
 * @param array|object $data
 * @param boolean $return
 * @return string|void
 */
function snippet( $file, $data = [], bool $return = false ) {
    if( is_object($data) === true ){
        $data = ['item' => $data];
    }

    if( file_exists($file) === false ){
        return '';
    }

    $exception = null;

    ob_start();

    extract($data);

    try {
        require $file;
    } catch (Throwable $e) {
        $exception = $e;
    }

    $snippet = ob_get_contents();

    ob_end_clean();

    if( $exception !== null ){
        throw $exception;
        return;
    }

    if( $return === true ){
        return $snippet;
    }

    echo $snippet;
}
