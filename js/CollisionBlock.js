export class CollisionBlock {
    constructor({ position, opacity }) {
        this.position = position;
        this.opacity = opacity;
        this.width = 16;
        this.height = 16;
    }
    draw({ ctx }) {
        ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update({ ctx }) {
        this.draw({ ctx });
    }
}