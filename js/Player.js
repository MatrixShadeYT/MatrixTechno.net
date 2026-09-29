import * as config from './config.js';
import { CheckCollision } from './Utils.js';
import { Sprite } from './Sprite.js';
export class Player extends Sprite {
    constructor({ collisionBlocks, position, animations }) {
        const imageSrc = './img/warrior/Idle.png';
        const frameBuffer = 5;
        const frameRate = 8;
        super({ imageSrc, frameRate, frameBuffer });
        this.collisionBlocks = collisionBlocks;
        this.speed = config.playerSpeed;
        this.position = position;
        this.facing = 'Right';
        this.updateHitbox();
        this.velocity = {
            x: 0,
            y: 0
        }
        this.animations = animations;
        for (let key in this.animations) {
            const image = new Image()
            image.src = this.animations[key].imageSrc
            this.animations[key].image = image;
        }
    }
    switchSprite({key}) {
        if (this.image == this.animations[key].image) return;
        this.image = this.animations[key].image;
        this.frameBuffer = this.animations[key].frameBuffer;
        this.frameRate = this.animations[key].frameRate;
    }
    update({ ctx }) {
        this.updateFrames();
        this.updateHitbox();
        ctx.fillStyle = `rgba(0,0,255,0.5)`;
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
        ctx.fillStyle = `rgba(0,255,0,0.5)`;
        ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
        this.draw({ ctx });
        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkForHorizontalCollision();
        this.applyGravity();
        this.updateHitbox();
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
            if (CheckCollision({ obj1: this.hitbox, obj2: collisionBlock })) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                    this.position.x = collisionBlock.position.x - offset - config.collisionBuffer;
                    break;
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                    const offset = this.hitbox.position.x - this.position.x;
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + config.collisionBuffer;
                }
            }
        }
    }
    applyGravity() {
        this.velocity.y += config.gravity;
        this.position.y += this.velocity.y;
    }
    checkForVerticalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (CheckCollision({ obj1: this.hitbox, obj2: collisionBlock })) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = collisionBlock.position.y - offset - config.collisionBuffer;
                    break;
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + config.collisionBuffer;
                }
            }
        }
    }
}