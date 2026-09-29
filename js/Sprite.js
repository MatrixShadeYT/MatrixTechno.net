export class Sprite {
    constructor({ position, imageSrc, frameRate = 1, frameBuffer = 3 }) {
        this.position = position;
        this.image = new Image();
        this.image.onload = () => {
            this.height = this.image.height;
            this.width = this.image.width/this.frameRate;
        }
        this.image.src = imageSrc;
        this.frameRate = frameRate;
        this.frameBuffer = frameBuffer;
        this.currentFrame = 1;
        this.elapsedFrames = 0;
    }
    draw({ ctx }) {
        if (!this.image) return;

        const cropbox = {
            position: {
                x: this.currentFrame * this.width,
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        }

        ctx.drawImage(this.image, cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height, this.position.x, this.position.y, this.width, this.height);
    }
    update({ ctx }) {
        this.draw({ ctx });
        this.updateFrames();
    }
    updateFrames() {
        this.elapsedFrames++
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++
            } else {
                this.currentFrame = 0;
            }
        }
    }
}