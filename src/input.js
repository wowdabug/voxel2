import { game } from "./main.js";

const g_keysOnce = {};

export function initInput() {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return {
        isKeyDown,
        isKeyDownOnce,
        
        keys: {}
    };
}

function onKeyDown(e) {
    game.input.keys[e.code] = true;
    if (!event.repeat) {
        g_keysOnce[e.code] = true;
    }
}

function onKeyUp(e) {
    game.input.keys[e.code] = false;
    g_keysOnce[e.code] = false;
}

function isKeyDown(code) {
    return game.input.keys[code];
}

function isKeyDownOnce(code) {
    let x = g_keysOnce[code];
    g_keysOnce[code] = false;
    return x;
}
