import { gravity } from './config.js';
export class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.box = {
            width: 50,
            height: 50
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.speed = 10;
    }
    render(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.box.width, this.box.height);
    }
    update({ keys, ctx }) {
        this.render(ctx);
        this.velocity.y += gravity;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.x *= 0.95;
        if (this.position.y + this.box.height > ctx.canvas.height) {
            this.position.y = ctx.canvas.height - this.box.height;
            this.velocity.y = 0;
        }

        this.velocity.x = 0;
        if (keys.w.pressed && this.velocity.y === 0) {
            this.velocity.y -= this.speed;
        }
        if (keys.a.pressed) {
            this.velocity.x = -this.speed;
        } else if (keys.d.pressed) {
            this.velocity.x = this.speed;
        }
        for (let i in keys) {
            keys[i].released = false;
        }
    }
}