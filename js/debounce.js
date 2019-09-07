export const debounce = (callback, wait) => {
    let timeout;
    return () => {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, arguments), wait);
    };
}
