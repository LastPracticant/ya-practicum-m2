export function getRandomIntInclusive(min: number, max: number) {
    const minValue = Math.ceil(min);
    const maxValue = Math.floor(max);

    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}
