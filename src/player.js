import { game } from "./main.js";
import { aabb } from "./lib/aabb.js";
import { random } from "./lib/random.js";

const g_entityMap = new Image();

export function initPlayer() {
    g_entityMap.src = "src/assets/entities.png";

    return {
        update,
        render,

        getBox,
        spawn,
        move,

        x: 0,
        y: 0,
        w: 14,
        h: 14,

        selectedTileX: 0,
        selectedTileY: 0,
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

    const pixelX = (game.input.mouseX - game.canvas.width / 2) / game.camera.zoom + game.camera.x;
    const pixelY = (game.input.mouseY - game.canvas.height / 2) / game.camera.zoom + game.camera.y;

    game.player.selectedTileX = Math.floor(pixelX / 16);
    game.player.selectedTileY = Math.floor(pixelY / 16);

    if (game.input.isMouseDown()) {
        let tileId;
        if (game.input.mouseButton == game.input.left) {
            tileId = game.tiles.void;
        } else if (game.input.mouseButton == game.input.right) {
            tileId = game.tiles.planks;
        }

        const box = game.player.getBox();
        const tile = aabb.getBox(
            game.player.selectedTileX * 16,
            game.player.selectedTileY * 16,
            (game.player.selectedTileX * 16) + 16,
            (game.player.selectedTileY * 16) + 16
        );

        const level = game.level.ground;
        const x = game.player.selectedTileX;
        const y = game.player.selectedTileY;
        if (!aabb.intersects(box, tile)) {
            game.tiles.removeBehaviors[game.level.getTile(level, x, y)](level, x, y);
            
            game.level.setTile(
                level,
                x,
                y,
                tileId
            );
            
            game.tiles.addBehaviors[game.level.getTile(level, x, y)](level, x, y);

            game.tiles.updateBehaviors[game.level.getTile(level, x - 1, y)](level, x - 1, y);
            game.tiles.updateBehaviors[game.level.getTile(level, x + 1, y)](level, x + 1, y);
            game.tiles.updateBehaviors[game.level.getTile(level, x, y - 1)](level, x, y - 1);
            game.tiles.updateBehaviors[game.level.getTile(level, x, y + 1)](level, x, y + 1);
            game.tiles.updateBehaviors[game.level.getTile(level - 1, x, y)](level - 1, x, y);
            game.tiles.updateBehaviors[game.level.getTile(level + 1, x, y)](level + 1, x, y);
        }
    }
}

export function render() {
    const relativeX = (game.player.x - 1) - game.camera.x;
    const relativeY = (game.player.y - 1) - game.camera.y;

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

function getBox() {
    return aabb.getBox(
        game.player.x,
        game.player.y,
        game.player.x + game.player.w,
        game.player.y + game.player.h
    );
}

function spawn() {
    while (true) {
        let tileX = random.getRandomInt(game.prng, 0, game.level.width);
        let tileY = random.getRandomInt(game.prng, 0, game.level.height);

        while (true) {
            const tile = game.level.getTile(game.level.ground, tileX, tileY)
            if (tile == game.tiles.void) {
                game.player.x = tileX * 16;
                game.player.y = tileY * 16;
                return;
            }

            if (tile == game.tiles.voidWall) {
                break;
            }

            ++tileX;
        }
    }
}

function move(x, y) {
    moveX(x);
    moveY(y);
}

function moveX(x) {
    game.player.x += x;

    const box = game.player.getBox();
    const tiles = game.level.getTileBoxes(game.level.ground, box);

    for (const tile of tiles) {
        if (aabb.intersects(box, tile)) {
            if (x > 0) {
                game.player.x = tile.minX - game.player.w;
            } else {
                game.player.x = tile.maxX;
            }
        }
    }
}

function moveY(y) {
    game.player.y += y;

    const box = game.player.getBox();
    const tiles = game.level.getTileBoxes(game.level.ground, box);

    for (const tile of tiles) {
        if (aabb.intersects(box, tile)) {
            if (y > 0) {
                game.player.y = tile.minY - game.player.h;
            } else {
                game.player.y = tile.maxY;
            }
        }
    }
}
