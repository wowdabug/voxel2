import { initInput } from "./input.js";
import { initLevel, updateLevel, renderLevel } from "./level.js";
import { initCamera, updateCamera } from "./camera.js";
import { initPlayer, updatePlayer, renderPlayer } from "./player.js";

export const game = {
    canvas: null,
    ctx: null,
    input: null,
    level: null,
    camera: null,
    player: null
};

let g_lastTime;

function init() {
    game.canvas = document.getElementById("canvas");
    game.ctx = canvas.getContext("2d");

    initInput();
    initLevel();
    initCamera();
    initPlayer();
}

function update(deltaTime) {
    updateLevel();
    updateCamera();
    updatePlayer(deltaTime);
}

function render() {
    game.canvas.width = window.innerWidth;
    game.canvas.height = window.innerHeight;

    renderLevel();
    renderPlayer();
}

function loop(currentTime) {
    const deltaTime = currentTime - g_lastTime;
    g_lastTime = currentTime;
    update(deltaTime);
    render();
    requestAnimationFrame(loop);
}

init();

requestAnimationFrame((timestamp) => {
    g_lastTime = timestamp;
    requestAnimationFrame(loop);
});
