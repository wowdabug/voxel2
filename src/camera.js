import { game } from "./main.js";

export function initCamera() {
    game.camera = {
        x: 0,
        y: 0
    };
}

export function updateCamera(deltaTime) {
    const speed = 0.1;

    moveCamera(
        (game.player.x - game.camera.x) * speed * deltaTime,
        (game.player.y - game.camera.y) * speed * deltaTime
    );
}

function moveCamera(x, y) {
    game.camera.x += x;
    game.camera.y += y;
}
