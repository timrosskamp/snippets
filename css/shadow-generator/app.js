const domReady = (cb) => {
    if( document.readyState === 'complete' || document.readyState === 'interactive' ){
        cb()
    }else{
        document.addEventListener('DOMContentLoaded', () => cb())
    }
}

domReady(() => {
    /** @type {HTMLFormElement} */
    const $form = document.querySelector('form.controls')
    /** @type {HTMLDivElement} */
    const $shadow = document.querySelector('.shadow')

    function logScale(min, max, value, steep = 0.7) {
        let progress = steep * Math.pow(value, 2) + (1 - steep) * value

        return progress * (max - min) + min
    }

    function updateBoxShadow() {
        // get input values
        let angle = parseInt($form.elements.angle.value)
        let darkness = parseInt($form.elements.darkness.value)
        let sharpness = parseInt($form.elements.sharpness.value)
        let size = parseInt($form.elements.size.value)

        // convert angle to radians
        angle *= Math.PI * 2
        angle /= 360
        // use logarithmic scale for size
        size = logScale(2, 100, size / 100)
        // normalize values
        darkness /= 100
        sharpness /= 100

        // calculate x, y factors from angle
        let xf = Math.sin(angle)
        let yf = -Math.cos(angle)

        let shadows = []

        // loop shadow layers
        let s = size
        while( s >= 1 ){
            // calculate offset for this layer
            let d = Math.max(1, Math.floor(s / 2))

            shadows.push({
                // horizontal shadow offset
                x: (d * xf).toFixed(1),
                // vertical shadow offset
                y: (d * yf).toFixed(1),
                b: Math.max(1, Math.floor(s))
            })

            s /= 2
        }

        let len = shadows.length

        // compensate for darkening due to layering multiple shadows
        darkness /= len

        let shadowCSS = shadows.reverse().map(({ x, y, b }, i) => {
            let p = i / (len - 1)
            let s = 1 - (sharpness * 2)

            let d = (darkness * (1 + (p - 0.5) * s))
            d *= 1 - (1 - sharpness) * 0.2
            d = d.toFixed(3)

            return `${x}px ${y}px ${b}px rgba(0, 0, 0, ${d})`
        }).join(',\n            ')

        $shadow.style.setProperty('box-shadow', shadowCSS)
        $shadow.innerHTML = `<pre>box-shadow: ${shadowCSS};</pre>`
    }

    $form.addEventListener('input', () => {
        updateBoxShadow()
    })

    updateBoxShadow()
})