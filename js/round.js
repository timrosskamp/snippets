/**
 * Rounds a number with decimals
 * 
 * @param {*} value - the number to round
 * @param {*} decimals - the amount of decimals desired
 */
const round = (value, decimals = 0) => {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
}