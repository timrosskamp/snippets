export function slideDown(el, options = {}) {
    el.style.display = ''
    const height = el.offsetHeight

    el.style.maxHeight = '0'
    el.style.overflow = 'hidden'
    el.style.transition = `max-height ${ options.duration || '0.5s' } ease`

    el.addEventListener('transitionend', function end(){
        el.removeEventListener('transitionend', end)

        el.style.maxHeight = ''
        el.style.overflow = ''
        el.style.transition = ''

        if( "done" in options ){
            options.done()
        }
    });

    requestAnimationFrame(() => requestAnimationFrame(() => {
        el.style.maxHeight = height + 'px';
    }))
}

export function slideUp(el, options = {}) {
    el.style.maxHeight = el.offsetHeight + 'px'
    el.style.overflow = 'hidden'
    el.style.transition = `max-height ${ options.duration || '0.5s' } ease`

    el.addEventListener('transitionend', function end(){
        el.removeEventListener('transitionend', end)

        el.style.maxHeight = ''
        el.style.overflow = ''
        el.style.transition = ''
        el.style.display = 'none'

        if( "done" in options ){
            options.done()
        }
    });

    requestAnimationFrame(() => requestAnimationFrame(() => {
            el.style.maxHeight = '0'
    }))
}
