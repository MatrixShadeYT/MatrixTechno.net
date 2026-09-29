import * as config from './config.js';
import { CheckCollision } from './Utils.js';
import { Sprite } from './Sprite.js';
export class Player extends Sprite {
    constructor({ collisionBlocks, position }) {
        const imageSrc = './img/warrior/Idle.png';
        const frameBuffer = 5;
        const frameRate = 8;
        super({ imageSrc, frameRate, frameBuffer });
        this.collisionBlocks = collisionBlocks
        this.position = position
        this.velocity = {
            x: 0,
            y: 0
        }
        this.speed = config.playerSpeed;
        this.updateHitbox();
    }
    update({ ctx }) {
        this.updateFrames();
        this.updateHitbox();
        ctx.fillStyle = `rgba(0,0,255,0.5)`;
        ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
        this.draw({ ctx });
        this.position.x += this.velocity.x;
        this.checkForHorizontalCollision();
        this.applyGravity();
        this.checkForVerticalCollision();
    }
    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 70,
                y: this.position.y + 50
            },
            height: 55,
            width: 25
        }
    }
    checkForHorizontalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (CheckCollision({ obj1: this, obj2: collisionBlock })) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    this.position.x = collisionBlock.position.x - this.width - config.collisionBuffer;
                    break;
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                    this.position.x = collisionBlock.position.x + collisionBlock.width + config.collisionBuffer;
                }
            }
        }
    }
    applyGravity() {
        this.position.y += this.velocity.y;
        this.velocity.y += config.gravity;
    }
    checkForVerticalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (CheckCollision({ obj1: this, obj2: collisionBlock })) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y - this.height - config.collisionBuffer;
                    break;
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y + collisionBlock.height + config.collisionBuffer;
                }
            }
        }
    }
}