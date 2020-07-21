/**
 * @param {string|number|boolean|null} value 
 * @return {string}
 */
export const stringifyHTMLAttribute = (value) => {
    if( value === null ){
        return 'null'
    }

    return value.toString()
}
