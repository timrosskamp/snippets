const encodeUriStrict = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

const stringify = (object) => {
    if( !object ) {
		return '';
    }
    
    return Object.keys(object).map(key => {
        const value = object[key];

        if( value === undefined ){
			return '';
        }
        
        if( value === null ){
            return encodeUriStrict(key);
        }

        if( Array.isArray(value) ){
			return value.reduce((acc, value) => {
                if( value === undefined ){
                    return acc;
                }
            
                if( value === null ){
                    return [...acc, [encodeUriStrict(key), '[]'].join('')];
                }
            
                return [...acc, [encodeUriStrict(key), '[]=', encodeUriStrict(value)].join('')];
            }, []).join('&');
		}
        
        return encodeUriStrict(key) + '=' + encodeUriStrict(value);
    }).filter(str => str.length > 0).join('&');
}
