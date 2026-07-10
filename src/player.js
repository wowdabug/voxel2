import { game } from "./main.js";
import { isKeyDown, isKeyDownOnce } from "./input.js";

export function initPlayer() {
    game.player = {
        x: 0,
        y: 0
    };
}

export function updatePlayer(deltaTime) {
    const speed = 0.1;

    if (isKeyDown("KeyW")) {
        movePlayer(0, -speed * deltaTime);
    }
    
    if (isKeyDown("KeyA")) {
        movePlayer(-speed * deltaTime, 0);
    }

    if (isKeyDown("KeyS")) {
        movePlayer(0, speed * deltaTime);
    }

    if (isKeyDown("KeyD")) {
        movePlayer(speed * deltaTime, 0);
    }
}

export function renderPlayer() {
    const size = 10;

    game.ctx.fillRect(
        game.player.x - (size / 2),
        game.player.y - (size / 2),
        size, 
        size
    );
}

function movePlayer(x, y) {
    game.player.x += x;
    game.player.y += y;
}
