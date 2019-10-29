/**
 * Creates a debounced function that delays invoking [func] until after [wait]
 * milliseconds have elapsed since the last time the debounced function was
 * invoked.
 * 
 * @param {function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 */
export const debounce = (func, wait) => {
    let timeout;
    return () => {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, arguments), wait);
    };
}
