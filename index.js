const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
canvas.style.width = '90%';


let lastTime = 0;
function animate(deltaTime) {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const delta = deltaTime - lastTime;
    lastTime = deltaTime;
}
window.requestAnimationFrame(animate);
