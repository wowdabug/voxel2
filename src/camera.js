import { game } from "./main.js";

import { debug } from "./lib/debug.js";

export function initCamera() {
    return {
        update,

        x: 0,
        y: 0,
        zoom: 2
    };
}

function update(deltaTime) {
    const speed = 0.001;

    moveCamera(
        (game.player.x - game.camera.x) * speed * deltaTime,
        (game.player.y - game.camera.y) * speed * deltaTime
    );

    debug.logOnce("cam", `${game.camera.x}, ${game.camera.y}`);
}

function moveCamera(x, y) {
    game.camera.x += x;
    game.camera.y += y;
}
