import * as config from './js/config.js';
import { Keys } from './js/Keys.js';
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

const collisionMap = [];
for (let i = 0; i < config.collisions.length; i += 36) {collisionMap.push(config.collisions.slice(i,i+36))}
const floorCollisionBlocks = [];
const platformCollisionBlocks = [];
collisionMap.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 1) { floorCollisionBlocks.push( new CollisionBlock({ position: {x: (x*16), y: (y*16) }, opacity: 0.5 }) ) }
        if (symbol === 2) { platformCollisionBlocks.push( new CollisionBlock({ position: {x: (x*16), y: (y*16) }, opacity: 0.25 }) ) }
    })
})

const player = new Player({
    collisionBlocks: floorCollisionBlocks,
    position: {
        x: 50,
        y: 250
    }
});

let lastTime = 0;
function animate(deltaTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(animate);
    const delta = deltaTime - lastTime;
    lastTime = deltaTime;

    ctx.save();
    ctx.scale(config.scale,config.scale);
    ctx.translate(0, -background.image.height + (canvas.height/config.scale));
    background.update({ ctx });
    floorCollisionBlocks.forEach((block) => { block.update({ ctx }) })
    platformCollisionBlocks.forEach((block) => { block.update({ ctx }) })
    player.update({ ctx });
    ctx.restore();

    player.velocity.x = 0;
    if (Keys.w.pressed && player.velocity.y === 0) {
        player.velocity.y -= player.speed;
    }
    if (Keys.a.pressed) {
        player.velocity.x = -player.speed;
    } else if (Keys.d.pressed) {
        player.velocity.x = player.speed;
    }
    for (let i in Keys) { Keys[i].released = false }
}
window.requestAnimationFrame(animate)