const g_prngs = Object.freeze({
    mulberry32: 0,
    splitmix32: 1
});

const g_currentPrng = g_prngs.splitmix32;

function mulberry32(a) {
    return function() {
        let t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

function splitmix32(a) {
    return function() {
        a |= 0; a = a + 0x9e3779b9 | 0;
        let t = a ^ a >>> 16; t = Math.imul(t, 0x21f0aaad);
        t = t ^ t >>> 15; t = Math.imul(t, 0x735a2d97);
        return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
    }
}

function getSeed() {
    return (Math.random() * 2 ** 32) >>> 0;
}

function getPrng(seed = getSeed()) {
    switch (g_currentPrng) {
        case g_prngs.mulberry32:
            return mulberry32(seed);
            break;
        case g_prngs.splitmix32:
            return splitmix32(seed);
            break;
        default:
            console.err("current PRNG invalid");
            break;
    }
}

function seedPrng(prng, seed = getSeed()) {
    switch (g_currentPrng) {
        case g_prngs.mulberry32:
            prng = mulberry32(seed);
            break;
        case g_prngs.splitmix32:
            prng = splitmix32(seed);
            break;
        default:
            console.err("current PRNG invalid");
            return null;
            break;
    }
}

function getRandomArbitrary(prng, min, max) {
    return prng() * (max - min) + min;
}

function getRandomInt(prng, min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(prng() * (maxFloored - minCeiled) + minCeiled);
}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(prng() * (maxFloored - minCeiled + 1) + minCeiled);
}

export const random = {
    getSeed,
    getPrng,
    seedPrng,
    getRandomArbitrary,
    getRandomInt,
    getRandomIntInclusive
};
