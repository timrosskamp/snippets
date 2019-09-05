import { transition, easeInOut } from 'plain-transition';

const slideUp = ( el, options = {} ) => {
    el.style.overflow = 'hidden';
    transition({
        from: el.offsetHeight,
        to: 0,
        duration: options.duration || 600,
        easing: easeInOut,
        onChange(height){
            el.style.height = height + 'px';
        },
        onDone(){
            el.style.height = '';
            el.style.overflow = '';
            el.style.display = 'none';
            options.onDone && options.onDone();
        }
    });
}
