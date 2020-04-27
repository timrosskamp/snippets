/**
 * Maps a value to a logarithmic scale.
 * 
 * @param {Number} min - minimal value
 * @param {Number} max - maximal value
 * @param {Float} steep - steepness of the curve (from 0 to 1)
 */
const logScale = (min, max, steep = 0.8) => (value) => {
    const progress = steep * Math.pow(value, 2) + (1 - steep) * value

    return progress * (max - min) + min
}