export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
import * as Utils from './Utils.js';
ctx.imageSmoothingEnabled = false;
canvas.height = 720;
canvas.width = 1280;

Utils.resizeCanvas({canvas});

import { Object } from './Object.js';
class Game {
    constructor({}) {}
    update({ deltaTime }) {}
    drawFrame({ctx}) {}
    render({ ctx, deltaTime }) {
        this.update({ deltaTime });
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.drawFrame({ ctx });
        for (const key in Utils.keys) if (Utils.keys[key].released) Utils.keys[key].released = false;
    }
}
export const game = new Game({});

let lastTime;
import './EventListeners.js';
function animate(timeStamp) {
    window.requestAnimationFrame(animate);
    lastTime = lastTime ?? timeStamp;
    const deltaTime = Math.min((timeStamp - lastTime) / 1000, 0.1);
    lastTime = timeStamp;
    game.render({ ctx, deltaTime });
}
window.requestAnimationFrame(animate);

console.log('Log "./js/Main.js"');