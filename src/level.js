import { game } from "./main.js";
import noise from "./lib/perlin.js";
import { random } from "./lib/random.js";

const g_tileMap = new Image();
const g_outline = new Image();
const g_prng = random.getPrng();

export function initLevel() {
    g_tileMap.src = "src/assets/tiles.png";
    g_outline.src = "src/assets/outline.png";

    const numberOfLayers = 3;

    const width = 64;
    const height = 64;

    const area = width * height;
    const totalArea = numberOfLayers * area;

    return {
        below: 0,
        ground: 1,
        above: 2,
        numberOfLayers,

        update,
        renderOutline,
        render,
        generate,

        getTile,
        setTile,
        getTileBoxes,

        width,
        height,

        area,
        totalArea,

        tileIds: new Uint8Array(totalArea),

        seed: null
    };
}

function update() {

}

function renderTile(tileIndex, screenX, screenY) {
    const padding = 1;

    game.ctx.imageSmoothingEnabled = false;
    game.ctx.drawImage(
        g_tileMap,
        (tileIndex % 16) * 16,
        Math.floor(tileIndex / 16) * 16,
        16,
        16, 
        screenX, 
        screenY, 
        game.camera.zoom * 16 + padding, 
        game.camera.zoom * 16 + padding
    );
}

function renderOutline() {
    const padding = 1;

    const tileY = game.player.selectedTileY;
    const tileX = game.player.selectedTileX;

    const pixelX = tileX * 16;
    const pixelY = tileY * 16;

    const screenX = (pixelX - game.camera.x) * game.camera.zoom + (game.canvas.width / 2);
    const screenY = (pixelY - game.camera.y) * game.camera.zoom + (game.canvas.height / 2);

    game.ctx.imageSmoothingEnabled = false;
    game.ctx.drawImage(
        g_outline,
        screenX, 
        screenY, 
        game.camera.zoom * 16 + padding, 
        game.camera.zoom * 16 + padding
    );
}

function render(layer) {
    const renderDistance = game.camera.renderDistance;

    const camX = Math.round((game.camera.x + 1) / 16);
    const camY = Math.round((game.camera.y + 1) / 16);

    const startX = camX - Math.floor(renderDistance / 2);
    const startY = camY - Math.floor(renderDistance / 2);

    const groundStart = game.level.area * game.level.ground;
    const aboveStart = game.level.area * game.level.above;

    const tileIds = game.level.tileIds;
    const voidId = game.tiles.void;

    const indices = game.tiles.indices;
    const opaque = game.tiles.opaque;
    
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

            const tile = (tileY * game.level.width) + tileX;

            const pixelX = tileX * 16;
            const pixelY = tileY * 16;

            const screenX = (pixelX - game.camera.x) * game.camera.zoom + (game.canvas.width / 2);
            const screenY = (pixelY - game.camera.y) * game.camera.zoom + (game.canvas.height / 2);
            
            const tileIdBelow = tileIds[tile];
            const tileIdGround = tileIds[groundStart + tile];
            const tileIdAbove = tileIds[aboveStart + tile];
            
            if (layer == game.level.below) {
                if (tileIdBelow !== voidId && !opaque[tileIdGround] && !opaque[tileIdAbove]) {
                    renderTile(indices[tileIdBelow], screenX, screenY);
                }
            } else if (layer == game.level.ground) {
                if (tileIdGround !== voidId && !opaque[tileIdAbove]) {
                    renderTile(indices[tileIdGround], screenX, screenY);
                }
            } else {
                if (tileIdAbove !== voidId) {
                    renderTile(indices[tileIdAbove], screenX, screenY);
                }
            }
        }
    }
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
    for (let i = 0; i < game.level.totalArea; ++i) {
        game.level.tileIds[i] = game.tiles.void;
    }
}

function generateFlat() {
    let i = 0;
    for (let j = 0; j < game.level.area; ++j) {
        game.level.tileIds[i] = game.tiles.grass;
        ++i;
    }
    for (let j = 0; j < game.level.area; ++j) {
        game.level.tileIds[i] = game.tiles.void;
        ++i;
    }
    for (let j = 0; j < game.level.area; ++j) {
        game.level.tileIds[i] = game.tiles.void;
        ++i;
    }
}

function generateRandom() {
    const prng = random.getPrng(game.level.seed);

    for (let i = 0; i < game.level.totalArea; ++i) {
        game.level.tileIds[i] = random.getRandomInt(prng, 0, game.tiles.numberOfTiles);
    }
}

function generateTree(x, y) {
    const height = 5;
    let canGenerate = true;

    if (game.level.getTile(game.level.ground, x, y) !== game.tiles.void) {
        canGenerate = false;
    }

    for (let i = 0; i < height; ++i) {
        if (game.level.getTile(game.level.above, x, y - i) !== game.tiles.void) {
            canGenerate = false;
        }
    }

    if (canGenerate) {
        game.level.setTile(game.level.ground, x, y, game.tiles.trunk);
        
        for (let i = 0; i < height - 2; ++i) {
            game.level.setTile(game.level.above, x, y - i, game.tiles.log);
        }

        for (let i = -1; i < 2; ++i) {
            for (let j = 0; j < 3; ++j) {
                game.level.setTile(game.level.above, x + i, y + j - height, game.tiles.leaves);
            }
        }

        for (let i = height - 2; i < height; ++i) {
            game.level.setTile(game.level.above, x, y - i, game.tiles.branches);
        }
    }
}

function generateNoise() {
    const prng = random.getPrng(game.level.seed);
    const scale = 0.1;

    noise.seed(game.level.seed);

    const groundStart = game.level.area * game.level.ground;
    const aboveStart = game.level.area * game.level.above;

    let i = 0;
    for (let y = 0; y < game.level.height; ++y) {
        for (let x = 0; x < game.level.width; ++x) {
            const n = (noise.perlin2(x * scale, y * scale) + 1) / 2;
            if (n > 0.6) {
                game.level.tileIds[i] = game.tiles.dirt;
                game.level.tileIds[groundStart + i] = game.tiles.stone;
            } else if (n > 0.4) {
                game.level.tileIds[i] = game.tiles.grass;
                game.level.tileIds[groundStart + i] = game.tiles.void;
            } else {
                game.level.tileIds[i] = game.tiles.sand;
                game.level.tileIds[groundStart + i] = game.tiles.void;
            }
            ++i;
        }
    }

    for (let j = aboveStart; j < game.level.totalArea; ++j) {
        game.level.tileIds[j] = game.tiles.void;
    }

    const clayCount = 16;
    // TODO

    const treeCount = 16;
    for (let j = 0; j < treeCount; ++j) {
        generateTree(
            random.getRandomInt(prng, 0, game.level.width),
            random.getRandomInt(prng, 0, game.level.height)
        );
    }
}

function getTile(layer, x, y) {
    if (x >= 0 && 
        x < game.level.width &&
        y >= 0 &&
        y < game.level.height
    ) {
        return game.level.tileIds[(layer * game.level.area) + (y * game.level.width) + x];
    } else {
        return game.tiles.voidWall;
    }
}

function setTile(layer, x, y, id) {
    if (x >= 0 && 
        x < game.level.width &&
        y >= 0 &&
        y < game.level.height
    ) {
        game.level.tileIds[(layer * game.level.area) + (y * game.level.width) + x] = id;
    }
}

function getTileBoxes(layer, a) {
    const minTileX = Math.floor(a.minX / 16);
    const minTileY = Math.floor(a.minY / 16);
    const maxTileX = Math.floor(a.maxX / 16);
    const maxTileY = Math.floor(a.maxY / 16);

    const tiles = [];

    for (let y = minTileY; y <= maxTileY; ++y) {
        for (let x = minTileX; x <= maxTileX; ++x) {
            if (game.tiles.solid[getTile(layer, x, y)]) {
                tiles.push({
                    minX: x * 16,
                    minY: y * 16,
                    maxX: (x + 1) * 16,
                    maxY: (y + 1) * 16
                });
            }
        }
    }

    return tiles;
}
