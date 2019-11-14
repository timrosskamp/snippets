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



const slideDown = ( el, options = {} ) => {
    el.style.display = '';
    const height = el.offsetHeight;

    el.style.maxHeight = '0';
    el.style.overflow = 'hidden';
    el.style.transition = `max-height ${ options.duration || '0.5s' } ease`;

    el.addEventListener('transitionend', function end(){
        el.removeEventListener('transitionend', end);

        el.style.maxHeight = '';
        el.style.overflow = '';
        el.style.transition = '';

        options.done && options.done();
    });

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            el.style.maxHeight = height + 'px';
        });
    });
}
