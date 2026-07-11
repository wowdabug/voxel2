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

        width,
        height,
        area,

        tileIds: new Uint8Array(area),
        seed: null
    };
}

function update() {

}

function render() {
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
        flat: 0,
        random: 1,
        noise: 2
    });

    const scale = 0.1;
    const type = types.noise;

    game.level.seed = (Math.random() * 2 ** 32) >>> 0;

    let prng;
    if (type == types.random) {
        prng = random.getPRNG(game.level.seed);
    }

    if (type == types.noise) {
        noise.seed(game.level.seed);
    }

    let i = 0;
    for (let y = 0; y < game.level.height; ++y) {
        for (let x = 0; x < game.level.width; ++x) {
            switch (type) {
                case types.flat:
                    game.level.tileIds[i] = game.tiles.grass;
                    break;
                case types.random:
                    game.level.tileIds[i] = random.getRandomInt(prng, 0, game.tiles.ids.length);
                    break;
                case types.noise:
                    const n = (noise.perlin2(x * scale, y * scale) + 1) / 2;
                    if (n > 0.6) {
                        game.level.tileIds[i] = game.tiles.stone;
                    } else if (n > 0.4) {
                        game.level.tileIds[i] = game.tiles.grass;
                    } else {
                        game.level.tileIds[i] = game.tiles.sand;
                    }
                    break;
                default:
                    game.level.tileIds[i] = game.tiles.void;
                    console.error("no valid type provided");
            }

            ++i;
        }
    }
}
