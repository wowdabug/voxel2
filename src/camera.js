import { game } from "./main.js";

export function initCamera() {
    return {
        update,
        spawn,

        x: 0,
        y: 0,
        zoom: 2,
        renderDistance: 16
    };
}

function update(deltaTime) {
    const speed = 0.005;

    move(
        ((game.player.x + 8) - game.camera.x) * speed * deltaTime,
        ((game.player.y + 8) - game.camera.y) * speed * deltaTime
    );
}

function move(x, y) {
    game.camera.x += x;
    game.camera.y += y;
}

function spawn(x, y) {
    game.camera.x = x;
    game.camera.y = y;
}
