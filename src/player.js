import { game } from "./main.js";

export function initPlayer() {
    return {
        update,
        render,

        x: 128,
        y: 128
    };
}

export function update(deltaTime) {
    const speed = 0.1;

    if (game.input.isKeyDown("KeyW")) {
        move(0, -speed * deltaTime);
    }
    
    if (game.input.isKeyDown("KeyA")) {
        move(-speed * deltaTime, 0);
    }

    if (game.input.isKeyDown("KeyS")) {
        move(0, speed * deltaTime);
    }

    if (game.input.isKeyDown("KeyD")) {
        move(speed * deltaTime, 0);
    }
}

export function render() {
    const size = 10;

    game.ctx.fillRect(
        game.player.x - (size / 2),
        game.player.y - (size / 2),
        size, 
        size
    );
}

function move(x, y) {
    game.player.x += x;
    game.player.y += y;
}
