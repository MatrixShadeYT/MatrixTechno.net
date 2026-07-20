import * as Utils from "./Utils.js";

export function resize(e) {
    const canvas = document.querySelector("canvas");
    Utils.resizeCanvas({ canvas })
}

export function keyUp(e) {
    const key = e.code;
    if (Utils.keys[key]) {
        e.preventDefault();
        Utils.keys[key].pressed = false;
        Utils.keys[key].released = true;
    }
}

export function keyDown(e) {
    const key = e.code;
    if (Utils.keys[key]) {
        e.preventDefault();
        Utils.keys[key].pressed = true;
    }
}

export const mouseMap = ["MouseLeft", "MouseMiddle", "MouseRight"];

export function mouseMove(e) {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    Utils.mousePosition.x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    Utils.mousePosition.y = ((e.clientY - rect.top) / rect.height) * canvas.height;
    Utils.mousePosition.x = Math.max(0, Math.min(canvas.width, Utils.mousePosition.x));
    Utils.mousePosition.y = Math.max(0, Math.min(canvas.height, Utils.mousePosition.y));
}

export function mouseDown(e) {
    const key = mouseMap[e.button];
    if (!Utils.keys[key]) return
    if (key && Utils.keys[key]) Utils.keys[key].pressed = true;
}

export function mouseUp(e) {
    const key = mouseMap[e.button];
    if (!Utils.keys[key]) return
    if (key && Utils.keys[key]) {
        Utils.keys[key].pressed = false;
        Utils.keys[key].released = true;
    }
}

window.addEventListener('contextmenu', (e) => e.preventDefault());
window.addEventListener('resize', resize);
window.addEventListener('keyup', keyUp);
window.addEventListener('keydown', keyDown);
window.addEventListener('mousemove', mouseMove);
window.addEventListener('mousedown', mouseDown);
window.addEventListener('mouseup', mouseUp);

console.log('Log "./js/EventListeners.js"');