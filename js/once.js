/**
 * @param {Element} el 
 * @param {string} name 
 * @param {Function} callback 
 */
export const once = (el, name, callback) => {
    function handler(){
        el.removeEventListener(name, handler)
        callback(...arguments)
    }
    el.addEventListener(name, handler)
}
