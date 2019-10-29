/**
 * Creates a throttled function that invokes [func] immediately, but at most
 * once per every [wait] milliseconds.
 * 
 * @param {function} func - The function to throttle.
 * @param {number} wait - The number of milliseconds to throttle invocations to.
 */
export const throttle = (func, wait) => {
    let lastFunc;
    let lastRan;
    
    return function(){
        const context = this;
        const args = arguments;

        if( !lastRan ){
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= wait) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, wait - (Date.now() - lastRan));
        }
    }
}
