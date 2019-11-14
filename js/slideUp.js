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



const slideUp = ( el, options = {} ) => {
    el.style.maxHeight = el.offsetHeight + 'px';
    el.style.overflow = 'hidden';
    el.style.transition = `max-height ${ options.duration || '0.5s' } ease`;

    el.addEventListener('transitionend', function end(){
        el.removeEventListener('transitionend', end);

        el.style.maxHeight = '';
        el.style.overflow = '';
        el.style.transition = '';
        el.style.display = 'none';

        options.done && options.done();
    });

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            el.style.maxHeight = '0';
        });
    });
}
