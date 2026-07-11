import { game } from "./main.js";
import { random } from "./lib/random.js";
import { debug } from "./lib/debug.js";

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
    const seed = (Math.random() * 2 ** 32) >>> 0;
    const prng = random.getPRNG(seed);
    
    game.level.seed = seed;

    for (let i = 0; i < game.level.area; ++i) {
        //game.level.tiles[i] = tiles.stone;
        game.level.tileIds[i] = random.getRandomInt(prng, 0, game.tiles.ids.length);
    }
}
