/**
 * Loads a script by url and executes a callback function
 * @param { string } url | URL of the script that gets loaded
 * @param { function } cb | Callback-function after the script has been loaded
 * @returns { void }
 */
export const loadJsFile = (url, cb) => {
	const isLoaded = Array.from(document.scripts).find(script => script.getAttribute('src') == url)

	if( isLoaded ){
		cb()
		return
	}

    const script = document.createElement('script')

    script.addEventListener('load', function load(){
        cb()

        script.removeEventListener('load', load)
    });

    script.src = url

    document.head.appendChild(script)
}
