import { game } from "./main.js";
import noise from "./lib/perlin.js";
import { random } from "./lib/random.js";
import {debug} from "./lib/debug.js";

const g_tileMap = new Image();
const g_outline = new Image();
const g_prng = random.getPrng();

export function initLevel() {
    g_tileMap.src = "src/assets/tiles.png";
    g_outline.src = "src/assets/outline.png";

    const width = 64;
    const height = 64;

    const area = width * height;

    return {
        update,
        render,
        generate,

        setTile,

        width,
        height,
        area,

        tileIdsBelow: new Uint8Array(area),
        tileIdsGround: new Uint8Array(area),
        tileIdsAbove: new Uint8Array(area), // to implement

        seed: null
    };
}

function update() {

}

function render() {
    const padding = 1;
    
    const renderDistance = game.camera.renderDistance;

    const camX = Math.round((game.camera.x + 1) / 16);
    const camY = Math.round((game.camera.y + 1) / 16);

    const startX = camX - Math.floor(renderDistance / 2);
    const startY = camY - Math.floor(renderDistance / 2);
    
    for (let y = 0; y < renderDistance; ++y) {
        const tileY = startY + y;

        if (tileY < 0 || tileY >= game.level.height) {
            continue;
        }

        for (let x = 0; x < renderDistance; ++x) {
            const tileX = startX + x;

            if (tileX < 0 || tileX >= game.level.width) {
                continue;
            }

            const tile = tileY * game.level.width + tileX;

            const pixelX = tileX * 16;
            const pixelY = tileY * 16;

            const screenX = (pixelX - game.camera.x) * game.camera.zoom + (game.canvas.width / 2);
            const screenY = (pixelY - game.camera.y) * game.camera.zoom + (game.canvas.height / 2);
            
            const tileIdBelow = game.level.tileIdsBelow[tile];
            const tileIndexBelow = game.tiles.indices[tileIdBelow];

            const tileIdGround = game.level.tileIdsGround[tile];
            const tileIndexGround = game.tiles.indices[tileIdGround];

            // wip culling
            if (tileIdGround == game.tiles.void && tileIdBelow != game.tiles.void) {
                game.ctx.imageSmoothingEnabled = false;
                game.ctx.drawImage(
                    g_tileMap,
                    (tileIndexBelow % 16) * 16,
                    Math.floor(tileIndexBelow / 16) * 16,
                    16,
                    16, 
                    screenX, 
                    screenY, 
                    game.camera.zoom * 16 + padding, 
                    game.camera.zoom * 16 + padding
                );
            }
            
            if (tileIdGround != game.tiles.void) {
                game.ctx.imageSmoothingEnabled = false;
                game.ctx.drawImage(
                    g_tileMap,
                    (tileIndexGround % 16) * 16,
                    Math.floor(tileIndexGround / 16) * 16,
                    16,
                    16, 
                    screenX, 
                    screenY, 
                    game.camera.zoom * 16 + padding, 
                    game.camera.zoom * 16 + padding
                );
            }
        }
    }
    
    const tileY = game.player.selectedTileY;
    const tileX = game.player.selectedTileX;

    const pixelX = tileX * 16;
    const pixelY = tileY * 16;

    const screenX = (pixelX - game.camera.x) * game.camera.zoom + (game.canvas.width / 2);
    const screenY = (pixelY - game.camera.y) * game.camera.zoom + (game.canvas.height / 2);

    game.ctx.drawImage(
        g_outline,
        screenX, 
        screenY, 
        game.camera.zoom * 16 + padding, 
        game.camera.zoom * 16 + padding
    );
}

function generate() {
    const types = Object.freeze({
        void: 0,
        flat: 1,
        random: 2,
        noise: 3
    });

    const type = types.noise;

    game.level.seed = random.getSeed();

    switch (type) {
        case types.void:
            generateVoid();
            break;
        case types.flat:
            generateFlat();
            break;
        case types.random:
            generateRandom();
            break;
        case types.noise:
            generateNoise();
            break;
        default:
            throw new Error("invalid type provided");
    }
}

function generateVoid() {
    for (let i = 0; i < game.level.area; ++i) {
        game.level.tileIds[i] = game.tiles.void;
    }
}

function generateFlat() {
    for (let i = 0; i < game.level.area; ++i) {
        game.level.tileIds[i] = game.tiles.grass;
    }
}

function generateRandom() {
    const prng = random.getPrng(game.level.seed);

    for (let i = 0; i < game.level.area; ++i) {
        game.level.tileIds[i] = random.getRandomInt(prng, 0, game.tiles.ids.length);
    }
}

function generateNoise() {
    const prng = random.getPrng(game.level.seed);
    const scale = 0.1;

    noise.seed(game.level.seed);

    let i = 0;
    for (let y = 0; y < game.level.height; ++y) {
        for (let x = 0; x < game.level.width; ++x) {
            const n = (noise.perlin2(x * scale, y * scale) + 1) / 2;
            if (n > 0.6) {
                game.level.tileIdsBelow[i] = game.tiles.dirt;
                game.level.tileIdsGround[i] = game.tiles.stone;
            } else if (n > 0.4) {
                game.level.tileIdsBelow[i] = game.tiles.grass;
            } else {
                game.level.tileIdsBelow[i] = game.tiles.sand;
            }
            for (let j = 0; j < 5; ++j) {
                const randomX = random.getRandomInt(prng, 0, game.level.width);
                const randomY = random.getRandomInt(prng, 0, game.level.height);
            }
            ++i;
        }
    }
}

function getTile(x, y, id) {
    if (x >= 0 || 
        x < game.level.width ||
        y >= 0 ||
        y < game.level.height
    ) {
        return game.level.tileIdsGround[x + (y * game.level.width)];
    }  
}

function setTile(x, y, id) {
    if (x >= 0 || 
        x < game.level.width ||
        y >= 0 ||
        y < game.level.height
    ) {
        game.level.tileIdsGround[x + (y * game.level.width)] = id;
    }
}

function getTilesInx() {
    
}
