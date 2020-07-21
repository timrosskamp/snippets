/**
 * @param {string} value
 * @return {string|number|boolean|null}
 */
export const parseHTMLAttribute = (value) => {
    if( value === 'null' ){
        return null
    }
    if( value === 'true' ){
        return true
    }
    if( value === 'false' ){
        return false
    }
    if( !isNaN(parseFloat(value)) ){
        return parseFloat(value)
    }

    return value
}
