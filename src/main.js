import { initInput } from "./input.js";
import { initTiles } from "./tiles.js";
import { initLevel } from "./level.js";
import { initCamera } from "./camera.js";
import { initPlayer } from "./player.js";

export const game = {
    canvas: null,
    ctx: null,
    input: null,
    tiles: null,
    level: null,
    camera: null,
    player: null
};

let g_lastTime;

function init() {
    game.canvas = document.getElementById("canvas");
    game.ctx = canvas.getContext("2d");

    game.ctx.imageSmoothingEnabled = false;

    game.input = initInput();
    game.tiles = initTiles();
    game.level = initLevel();
    game.camera = initCamera();
    game.player = initPlayer();

    game.level.generate();
}

function update(deltaTime) {
    game.level.update();
    game.camera.update();
    game.player.update(deltaTime);
}

function render() {
    game.canvas.width = window.innerWidth;
    game.canvas.height = window.innerHeight;

    game.level.render();
    game.player.render();
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
