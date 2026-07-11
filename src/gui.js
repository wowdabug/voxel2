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
        const fontSize = 12;

        const debug = [
            `px: ${game.player.x.toFixed(1)}`,
            `py: ${game.player.y.toFixed(1)}`,
            `cx: ${game.camera.x.toFixed(1)}`,
            `py: ${game.camera.y.toFixed(1)}`,
            "",
            `ft: ${game.gui.frameTime.toFixed(1)}`,
            `fps: ${game.gui.framesPerSecond.toFixed(1)}`,
            "",
            `mx: ${game.input.mouseX}`,
            `my: ${game.input.mouseY}`,
            "",
            `rd: ${game.camera.renderDistance}`
        ];

        game.ctx.font = `${fontSize}px sans-serif`;
        game.ctx.fillStyle = "white";

        let y = fontSize;
        for (const line of debug) {
            game.ctx.fillText(line, 0, y);
            y += fontSize;
        }
    }

    
}
