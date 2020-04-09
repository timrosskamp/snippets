# CSS/SCSS Snippets

## Nicer CSS Shadows

[timrosskamp.github.io/snippets/scss/shadows](https://timrosskamp.github.io/snippets/scss/shadows)

## `inline-svg()`
```scss
@function str-replace($string, $search, $replace: ''){
    $index: str-index($string, $search);
    @if $index {
        @return str-slice($string, 1, $index - 1) + $replace + str-replace(str-slice($string, $index + str-length($search)), $search, $replace);
    }
    @return $string;
}
  
@function svg-encode($string){
    $map: (
        "'": "\"",
        "@": "%40",
        "&": "%26",
        "+": "%2B",
        "/": "%2F",
        "?": "%3F",
        "#": "%23"
    );
    $new: $string;
    @each $search, $replace in $map {
        $new: str-replace($new, $search, $replace);
    }
    @return $new;
}

@function inline-svg($string){
    @return url('data:image/svg+xml;utf8,#{svg-encode($string)}');
}
```
