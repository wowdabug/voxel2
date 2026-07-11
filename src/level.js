import { game } from "./main.js";
import noise from "./lib/perlin.js";
import { random } from "./lib/random.js";

const g_tileMap = new Image();

export function initLevel() {
    g_tileMap.src = "src/assets/tiles.png";

    const width = 32;
    const height = 32;

    const area = width * height;

    return {
        update,
        render,
        generate,

        setTile,

        width,
        height,
        area,

        tileIds: new Uint8Array(area),
        seed: null
    };
}

function update() {

}

let rotationAngle = 0;

function render() {
    rotationAngle += 0.01;
    const renderDistance = game.camera.renderDistance;

    const camX = Math.round((game.camera.x + 1) / 16);
    const camY = Math.round((game.camera.y + 1) / 16);

    const startX = camX - Math.floor(renderDistance / 2);
    const startY = camY - Math.floor(renderDistance / 2);
    
    for (let y = 0; y < renderDistance; ++y) {
        const mapY = startY + y;

        if (mapY < 0 || mapY >= game.level.height) {
            continue;
        }

        for (let x = 0; x < renderDistance; ++x) {
            const mapX = startX + x;

            if (mapX < 0 || mapX >= game.level.width) {
                continue;
            }

            const tile = mapY * game.level.width + mapX;
            const tileId = game.level.tileIds[tile];
            const tileIndex = game.tiles.indices[tileId];

            const worldX = mapX * 16;
            const worldY = mapY * 16;

            const screenX = (worldX - game.camera.x) * game.camera.zoom + (game.canvas.width / 2);
            const screenY = (worldY - game.camera.y) * game.camera.zoom + (game.canvas.height / 2);

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
    const prng = random.getPRNG(game.level.seed);

    for (let i = 0; i < game.level.area; ++i) {
        game.level.tileIds[i] = random.getRandomInt(prng, 0, game.tiles.ids.length);
    }
}

function generateNoise() {
    const prng = random.getPRNG(game.level.seed);
    const scale = 0.1;

    noise.seed(game.level.seed);

    let i = 0;
    for (let y = 0; y < game.level.height; ++y) {
        for (let x = 0; x < game.level.width; ++x) {
            const n = (noise.perlin2(x * scale, y * scale) + 1) / 2;
            if (n > 0.6) {
                game.level.tileIds[i] = game.tiles.stone;
            } else if (n > 0.4) {
                game.level.tileIds[i] = game.tiles.grass;
            } else {
                game.level.tileIds[i] = game.tiles.sand;
            }
            for (let j = 0; j < 5; ++j) {
                const randomX = random.getRandomInt(prng, 0, game.level.width);
                const randomY = random.getRandomInt(prng, 0, game.level.height);
            }
            ++i;
        }
    }
}

function setTile(x, y, id) {
    if (x >= 0 || 
        x < game.level.width ||
        y >= 0 ||
        y < game.level.height
    ) {
        game.level.tileIds[x + (y * game.level.width)] = 1;
    }
}
