import { createApp, ref, computed } from 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js'

const App = {
    setup() {
        const logScale = (min, max, value, steep = 0.7) => {
            const progress = steep * Math.pow(value, 2) + (1 - steep) * value

            return progress * (max - min) + min
        }

        const angleInput = ref(180)
        const darknessInput = ref(20)
        const sharpnessInput = ref(100)
        const sizeInput = ref(32)

        const angle = computed(() => angleInput.value / 360)
        const size = computed(() => logScale(2, 100, sizeInput.value / 100))
        const darkness = computed(() => darknessInput.value / 100)
        const sharpness = computed(() => {
            let s = sharpnessInput.value / 100
            return s
        })

        const boxShadow = computed(() => {
            let shadows = []

            let xf = Math.sin(angle.value * Math.PI * 2).toFixed(2)
            let yf = -Math.cos(angle.value * Math.PI * 2).toFixed(2)

            let s = size.value
            while( s >= 1 ){
                let d = Math.max(1, Math.floor(s / 2))
                let x = (d * xf).toFixed(1)
                let y = (d * yf).toFixed(1)
                let b = Math.floor(s)

                shadows.push({ x, y, b })

                s /= 2
            }

            return shadows.reverse().map(({ x, y, b }, i) => {
                let d = darkness.value / shadows.length
                let p = i / (shadows.length-1)
                let s = 1 - (sharpness.value * 2)

                // apply sharpness
                d = (d * (1 + (p - 0.5) * s))
                // reduce darkness for less sharpness
                d *= 1 - (1 - sharpness.value) * 0.2
                // rounding
                d = d.toFixed(2)

                return `${x}px ${y}px ${b}px rgba(0, 0, 0, ${d})`
            }).join(', \n            ')
        })

        return {
            angleInput,
            darknessInput,
            sharpnessInput,
            sizeInput,
            boxShadow
        }
    }
}

const app = createApp(App)

app.mount('#app')