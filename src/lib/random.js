const g_prngs = Object.freeze({
    mulberry32: 0,
    splitmix32: 1
});

const g_currentPRNG = g_prngs.splitmix32;

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

export function getPRNG(seed) {
    switch (g_currentPRNG) {
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

export function seedPRNG(prng, seed) {
    switch (g_currentPRNG) {
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

export function getRandomArbitrary(prng, min, max) {
    return prng() * (max - min) + min;
}

export function getRandomInt(prng, min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(prng() * (maxFloored - minCeiled) + minCeiled);
}

export function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(prng() * (maxFloored - minCeiled + 1) + minCeiled);
}

export const random = {
    getPRNG,
    seedPRNG,
    getRandomArbitrary,
    getRandomInt,
    getRandomIntInclusive
};
