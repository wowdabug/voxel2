import { game } from "./main.js";

export function initGui() {
    return {
        render,

        frameTime: 0,
        framesPerSecond: 0
    };
}

export function render(deltaTime) {
    const debugEnabled = true;

    if (debugEnabled) {
        const debug = [
            `px: ${game.player.x.toFixed(1)}`,
            `py: ${game.player.y.toFixed(1)}`,
            `cx: ${game.camera.x.toFixed(1)}`,
            `py: ${game.camera.y.toFixed(1)}`,
            "",
            `ft: ${game.gui.frameTime.toFixed(1)}`,
            `fps: ${game.gui.framesPerSecond.toFixed(1)}`
        ];

        game.ctx.fillStyle = "white";

        let y = 10;
        for (const line of debug) {
            game.ctx.fillText(line, 0, y);
            y += 10;
        }
    }
}
