import { game } from "./main.js";

import { debug } from "./lib/debug.js";

export function initCamera() {
    return {
        update,

        x: 0,
        y: 0,
        zoom: 2,
        renderDistance: 16
    };
}

function update(deltaTime) {
    const speed = 0.005;

    moveCamera(
        (game.player.x - game.camera.x) * speed * deltaTime,
        (game.player.y - game.camera.y) * speed * deltaTime
    );
}

function moveCamera(x, y) {
    game.camera.x += x;
    game.camera.y += y;
}
