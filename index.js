import { keys } from './Keys.js';
import { Player } from './js/Player.js';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 450;
canvas.style.width = '80%';

const player = new Player();

let lastTime = 0;
function animate(deltaTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(animate);
    const delta = deltaTime - lastTime;
    lastTime = deltaTime;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 25, 25);

    player.update({ keys, ctx });
}
window.requestAnimationFrame(animate);