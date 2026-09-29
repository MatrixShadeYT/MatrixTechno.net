export const keys = {
    "w": { pressed: false, released: false },
    "a": { pressed: false, released: false },
    "d": { pressed: false, released: false }
};

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
    }
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = false;
            keys.w.released = true;
            break;
        case 'a':
            keys.a.pressed = false;
            keys.a.released = true;
            break;
        case 'd':
            keys.d.pressed = false;
            keys.d.released = true;
            break;
    }
})