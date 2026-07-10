import { game } from "./main.js";
import { tiles, numberOfTiles } from "./tile.js";
import { getPRNG, getRandomInt } from "./lib/random.js";

const g_levelWidth = 256;
const g_levelHeight = 256;

export function initLevel() {
    game.level = {
        tiles: new Uint8Array(g_levelWidth * g_levelHeight),
        seed: null
    };
}

export function updateLevel() {

}

export function renderLevel() {

}

function generateLevel() {
    game.level.seed = (Math.random() * 2 ** 32) >>> 0;
    const prng = getPRNG();
    for (let i = 0; i < g_levelWidth * g_levelHeight; ++i) {
        game.level.tiles[i] = tiles.stone;
        //game.level.tiles[i] = getRandomInt(prng, 0, numberOfTiles);
    }
}
