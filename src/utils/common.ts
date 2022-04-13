export const randomNum = (min: number, max: number): number => {
    const randomDelta = Math.random() * (max - min + 1);
    return Math.floor(randomDelta) + min;
};
