import { game } from "./main.js";
import { random } from "./lib/random.js";

const g_tileMap = new Image();

export function initLevel() {
    g_tileMap.src = "src/assets/tiles.png";

    const width = 256;
    const height = 256;

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
    let index = 0;
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
            game.ctx.drawImage(
				g_tileMap,
				game.level.tileIds[index] % 16 * 16,
				Math.floor(game.level.tileIds[index] / 16) * 16,
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

function generate() {
    game.level.seed = (Math.random() * 2 ** 32) >>> 0;
    const prng = random.getPRNG();
    for (let i = 0; i < game.level.area; ++i) {
        //game.level.tiles[i] = tiles.stone;
        game.level.tileIds[i] = random.getRandomInt(prng, 0, game.tiles.numberOfIds);
    }
}
