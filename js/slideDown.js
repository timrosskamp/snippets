import { transition, easeInOut } from 'plain-transition';

const slideDown = ( el, options = {} ) => {
    el.style.display = '';
    el.style.overflow = 'hidden';
    transition({
        from: 0,
        to: el.offsetHeight,
        duration: options.duration || 600,
        easing: easeInOut,
        onChange(height){
            el.style.height = height + 'px';
        },
        onDone(){
            el.style.height = '';
            el.style.overflow = '';
            options.onDone && options.onDone();
        }
    });
}
