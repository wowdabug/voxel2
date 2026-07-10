import { game } from "./main.js";
import { tiles, numberOfTiles } from "./tile.js";
import { getPRNG, getRandomInt } from "./lib/random.js";

const g_tileMap = new Image();

const g_levelWidth = 256;
const g_levelHeight = 256;

export function initLevel() {
    g_tileMap.src = "src/assets/tiles.png";

    game.level = {
        tiles: new Uint8Array(g_levelWidth * g_levelHeight),
        seed: null
    };

    generateLevel();
}

export function updateLevel() {

}

export function renderLevel() {
    let index = 0;
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
            game.ctx.drawImage(
				g_tileMap,
				game.level.tiles[index] % 16 * 16,
				Math.floor(game.level.tiles[index] / 16) * 16,
				16,
				16, 
				x * 16, 
				y * 16, 
				16, 
				16
			);
			++index;
		}
    }
}

function generateLevel() {
    game.level.seed = (Math.random() * 2 ** 32) >>> 0;
    const prng = getPRNG();
    for (let i = 0; i < g_levelWidth * g_levelHeight; ++i) {
        //game.level.tiles[i] = tiles.stone;
        game.level.tiles[i] = getRandomInt(prng, 0, numberOfTiles);
    }
}
