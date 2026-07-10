import { game } from "./main.js";

const g_entityMap = new Image();

export function initPlayer() {
    g_entityMap.src = "src/assets/entities.png";

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
        128 * game.camera.zoom - (size / 2),
        128 * game.camera.zoom - (size / 2),
        size, 
        size
    );

    const id = 0;
    const padding = 1;
    game.ctx.imageSmoothingEnabled = false;
    game.ctx.drawImage(
        g_entityMap,
        id % 16 * 16 + padding,
        Math.floor(id / 16) * 16 + padding,
        16 - (padding * 2),
        16 - (padding * 2), 
        (game.player.x - 8) * game.camera.zoom, 
        (game.player.y - 8) * game.camera.zoom, 
        game.camera.zoom * 16, 
        game.camera.zoom * 16
    );
}

function move(x, y) {
    game.player.x += x;
    game.player.y += y;
}
