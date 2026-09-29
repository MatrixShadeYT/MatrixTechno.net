import * as config from './js/config.js';
import { keys } from './js/Keys.js';
import { CollisionBlock } from './js/CollisionBlock.js';
import { Sprite } from './js/Sprite.js';
import { Player } from './js/Player.js';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 450;
canvas.style.width = '90%';

const background = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: './img/background.png',
});

const collisionBlocks = [];
config.floorCollisions.forEach((row) => {
    row.forEach((symbol) => {
        if (symbol === 1) {
            collisionBlocks.push(new CollisionBlock({ position: { x: 0, y: 0, }, }));
        }
    })
})

const player = new Player();

let lastTime = 0;
function animate(deltaTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(animate);
    const delta = deltaTime - lastTime;
    lastTime = deltaTime;

    ctx.save();
    ctx.scale(3,3);
    ctx.translate(0, -background.image.height + (canvas.height/3));
    background.update({ ctx });
    ctx.restore();
    player.update({ keys, ctx });
}
window.requestAnimationFrame(animate);