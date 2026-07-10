const g_keys = new Map();

function log(x) {
    console.log(x);
}

function logOnce(key, x) {
    if (!g_keys.get(key)) {
        g_keys.set(key, true);
        console.log(x);
    }
}

function error(x) {
    console.error(x);
}

function errorOnce(key, x) {
    if (!g_keys.get(key)) {
        g_keys.set(key, true);
        console.error(x);
    }
}

export const debug = {
    log,
    logOnce,
    error,
    errorOnce
};
