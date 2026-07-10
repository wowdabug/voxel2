import { initGui } from "./gui.js";
import { initInput } from "./input.js";
import { initTiles } from "./tiles.js";
import { initLevel } from "./level.js";
import { initCamera } from "./camera.js";
import { initPlayer } from "./player.js";

export const game = {
    canvas: null,
    ctx: null,
    gui: null,
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

    game.gui = initGui();
    game.input = initInput();
    game.tiles = initTiles();
    game.level = initLevel();
    game.camera = initCamera();
    game.player = initPlayer();

    game.level.generate();
}

function update(deltaTime) {
    game.level.update();
    game.camera.update(deltaTime);
    game.player.update(deltaTime);
}

function render() {
    game.canvas.width = window.innerWidth;
    game.canvas.height = window.innerHeight;
    const renderDistance = game.camera.renderDistance;

    const size = (renderDistance - 1) * 16 * game.camera.zoom;

    game.ctx.save();

    game.ctx.beginPath();
    
    game.ctx.rect(
        (game.canvas.width / 2) - (size / 2),
        (game.canvas.height / 2) - (size / 2),
        size,
        size
    );

    game.ctx.clip();

    game.level.render();
    game.player.render();

    game.ctx.restore();

    game.gui.render();
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
