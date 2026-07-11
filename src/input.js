import { game } from "./main.js";

const g_keysOnce = {};
let g_mouseDown = false;
let g_mouseDownOnce = false;

export function initInput() {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    return {
        isKeyDown,
        isKeyDownOnce,
        isMouseDown,
        isMouseDownOnce,
        
        keys: {},
        mouseX: 0,
        mouseY: 0
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

function onMouseDown(e) {
    g_mouseDown = true;
    g_mouseDownOnce = true;
}

function onMouseUp(e) {
    g_mouseDown = false;
    g_mouseDownOnce = false;
}

function onMouseMove(e) {
    game.input.mouseX = e.clientX;
    game.input.mouseY = e.clientY;
}

function isKeyDown(code) {
    return game.input.keys[code];
}

function isKeyDownOnce(code) {
    if (g_keysOnce[code]) {
        g_keysOnce[code] = false;
        return true;
    } else {
        return false;
    }
}

function isMouseDown() {
    return g_mouseDown;
}

function isMouseDownOnce() {
    if (g_mouseDownOnce) {
        g_mouseDownOnce = false;
        return true;
    } else {
        return false;
    }
}
