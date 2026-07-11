import { game } from "./main.js";
import { random } from "./lib/random.js";

const g_entityMap = new Image();
const g_prng = random.getPRNG();

export function initPlayer() {
    g_entityMap.src = "src/assets/entities.png";
    
    return {
        update,
        render,

        x: 32,
        y: 32
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

    if (game.input.isMouseDownOnce()) {
        const randomX = random.getRandomInt(g_prng, 0, game.level.width);
        const randomY = random.getRandomInt(g_prng, 0, game.level.height);
        const id = game.tiles.stone;
        game.level.setTile(randomX, randomY, id);
    }
}

export function render() {
    const relativeX = game.player.x - game.camera.x - 8;
    const relativeY = game.player.y - game.camera.y - 8;

    const id = 0;
    const padding = -1;

    game.ctx.imageSmoothingEnabled = false;
    game.ctx.drawImage(
        g_entityMap,
        id % 16 * 16 - padding,
        Math.floor(id / 16) * 16 - padding,
        16 + (padding * 2),
        16 + (padding * 2), 
        (relativeX * game.camera.zoom) + (game.canvas.width / 2), 
        (relativeY * game.camera.zoom) + (game.canvas.height / 2), 
        game.camera.zoom * 16, 
        game.camera.zoom * 16
    );
}

function move(x, y) {
    game.player.x += x;
    game.player.y += y;
}
