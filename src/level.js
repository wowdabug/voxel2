import { game } from "./main.js";
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
    const renderDistance = 16;

    const startY = Math.floor((game.camera.y / 16) - (renderDistance / 2));
    const startX = Math.floor((game.camera.x / 16) - (renderDistance / 2));

    let index = 0;
    for (let y = startY; y < startY + renderDistance; ++y) {
        for (let x = startX; x < startX + renderDistance; ++x) {
            const tileIndex = game.tiles.indices[game.level.tileIds[index]];
            game.ctx.imageSmoothingEnabled = false;
            game.ctx.drawImage(
				g_tileMap,
				tileIndex % 16 * 16,
				Math.floor(tileIndex / 16) * 16,
				16,
				16, 
				x * game.camera.zoom * 16, 
				y * game.camera.zoom * 16, 
				game.camera.zoom * 16, 
				game.camera.zoom * 16
			);
			++index;
		}
    }
}

function generate() {
    game.level.seed = (Math.random() * 2 ** 32) >>> 0;
    const prng = random.getPRNG();
    for (let i = 0; i < game.level.area; ++i) {
        //game.level.tiles[i] = tiles.stone;
        game.level.tileIds[i] = random.getRandomInt(prng, 0, game.tiles.numberOfIds);
    }
}
