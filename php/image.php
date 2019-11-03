<?php

/**
 * Modifies and saves an image.
 */
function image( string $file, array $options, string $thumbnailsPath = 'images/thumbs/', bool $return = false ){

    if( !array_key_exists('crop', $options) ){
        $options['crop'] = true;
    }

    $path = $thumbnailsPath;
    $path .= pathinfo($file, PATHINFO_FILENAME);

    $path .= '-' . hash_file('crc32', $file);

    if( array_key_exists('w', $options) && array_key_exists('h', $options) ){
        $path .= '-' . $options['w'] . 'x' . $options['h'];

        if( $options['crop'] == true ){
            $path .= '-crop';
        }
    }else if( array_key_exists('w', $options) ){
        $path .= '-' . $options['w'];
    }else if( array_key_exists('h', $options) ){
        $path .= '-' . $options['h'];
    }

    $path .= '.' . pathinfo($file, PATHINFO_EXTENSION);

    if( file_exists($path) ){
        if( $return ){
            return $path;
        }
    
        echo $path;
        return;
    }

    $original = [];

    list(
        $original['w'],
        $original['h'],
        $original['type']
    ) = getimagesize($file);

    // create original image
    switch(  $original['type'] ){
        case IMAGETYPE_GIF: {
            $original['image'] = imagecreatefromgif($file);
            break;
        }
        case IMAGETYPE_JPEG: {
            $original['image'] = imagecreatefromjpeg($file);

            try {
                $exif = @exif_read_data($file);
            }catch( Exception $e ){
                $exif = null;
            }

            // correct image orientation
            if( $exif && isset($exif['Orientation']) ){
                $orientation = $exif['Orientation'];

                if( $orientation === 6 || $orientation === 5 ){
                    $original['image'] = imagerotate($original['image'], 270, null);
                }else if( $orientation === 3 || $orientation === 4 ){
                    $original['image'] = imagerotate($original['image'], 180, null);
                }else if( $orientation === 8 || $orientation === 7 ){
                    $original['image'] = imagerotate($original['image'], 90, null);
                }

                if( $orientation === 5 || $orientation === 4 || $orientation === 7 ){
                    imageflip( $original['image'], IMG_FLIP_HORIZONTAL );
                }

                // set new width and height for image, maybe it has changed
                $original['w'] = imagesx($original['image']);
                $original['h'] = imagesy($original['image']);
            }

            break;
        }
        case IMAGETYPE_PNG: {
            $original['image'] = imagecreatefrompng($file);
            break;
        }
        case IMAGETYPE_WEBP: {
            $original['image'] = imagecreatefromwebp($file);
            break;
        }
        default: {
            throw new Error('Unsupported image type.');
        }
    }

    $resized = [
        'type' => ( $options['type'] ?? $original['type'] )
    ];

    if( !$original['image'] ){
        throw new Error('Could not load image.');
    }

    $pos = [
        'x' => 0,
        'y' => 0
    ];

    $crop = [
        'w' => $original['w'],
        'h' => $original['h']
    ];

    if( array_key_exists('w', $options) && array_key_exists('h', $options) ){

        if( $options['crop'] == true ){

            $resized['w'] = $options['w'];
            $resized['h'] = $options['h'];

            if( ( $original['w'] / $original['h'] ) > ( $options['w'] / $options['h'] ) ){
                // adjust to height
                $crop['w'] = $original['h'] * $options['w'] / $options['h'];
                $pos['x'] = ( ( $original['w'] - $crop['w'] ) / 2 );
            }else{
                // adjust to width
                $crop['h'] = $original['w'] * $options['h'] / $options['w'];
                $pos['y'] = ( ( $original['h'] - $crop['h'] ) / 2 );
            }

        }else{

            if( ( $original['w'] / $original['h'] ) > ( $options['w'] / $options['h'] ) ){
                // adjust to height
                $resized['w'] = $options['w'];
                $resized['h'] = round( $options['w'] * $original['h'] / $original['w'] );
            }else{
                // adjust to width
                $resized['h'] = $options['h'];
                $resized['w'] = round( $options['h'] * $original['w'] / $original['h'] );
            }

        }

    }else if( array_key_exists('w', $options) ){
        
        $resized['w'] = $options['w'];
        $resized['h'] = round( $options['w'] * $original['h'] / $original['w'] );

    }else if( array_key_exists('h', $options) ){

        $resized['h'] = $options['h'];
        $resized['w'] = round( $options['h'] * $original['w'] / $original['h'] );

    }

    $resized['image'] = imagecreatetruecolor($resized['w'], $resized['h']);

    imagecopyresampled(
        $resized['image'],          // src image
        $original['image'],         // dest image
        0,                          // x-coordinate of destination point
        0,                          // y-coordinate of destination point
        $pos['x'],                          // x-coordinate of source point
        $pos['y'],                          // y-coordinate of source point
        $resized['w'],              // Destination width       
        $resized['h'],              // Destination height
        $crop['w'],             // Breite der Quelle
        $crop['h']              // Höhe der Quelle
    );

    // Generate Destination Image
    switch( $resized['type'] ){
        case IMAGETYPE_GIF: {
            imagegif($resized['image'], $path);
            break;
        }
        case IMAGETYPE_JPEG: {
            imagejpeg($resized['image'], $path/*, $quality*/);
            break;
        }
        case IMAGETYPE_PNG: {
            imagepng($resized['image'], $path/*, $quality*/);
            break;
        }
        case IMAGETYPE_WEBP: {
            imagewebp($resized['image'], $path/*, $quality*/);
            break;
        }
    }

    imagedestroy($resized['image']);

    if( $return ){
        return $path;
    }

    echo $path;
}
