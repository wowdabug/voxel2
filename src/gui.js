import { game } from "./main.js";

export function initGui() {
    return {
        render
    };
}

export function render() {
    const debug = [
        `px: ${game.player.x.toFixed(1)}`,
        `py: ${game.player.y.toFixed(1)}`,
        `cx: ${game.camera.x.toFixed(1)}`,
        `py: ${game.camera.y.toFixed(1)}`
    ];

    game.ctx.fillStyle = "white";

    let y = 10;
    for (const line of debug) {
        game.ctx.fillText(line, 0, y);
        y += 10;
    }
}
