/**
 * @param {string} eventName 
 * @param {Element} target 
 */
export const dispatch = (eventName, target) => {
    const event = new CustomEvent(eventName, {
        bubbles: true,
        cancelable: true
    })
    target.dispatchEvent(event)
    return event
}
