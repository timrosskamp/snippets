/**
 * Wraps a HTML-Element's children in a new HTML-Element
 * @param { HTMLElement } target | The element where the wrapper gets appended
 * @param { HTMLElement } [wrapper] | The element that acts as a wrapper
 * @returns { HTMLElement } | The newly appended wrapper
 */
export const wrapAll = ( target, wrapper = document.createElement('div') ) => {
    Array.prototype.forEach.call(target.childNodes, child => wrapper.appendChild(child));
    target.appendChild(wrapper);
    return wrapper;
}
