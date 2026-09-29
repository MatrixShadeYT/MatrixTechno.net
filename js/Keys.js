export const Keys = {
    "w": { pressed: false, released: false },
    "a": { pressed: false, released: false },
    "d": { pressed: false, released: false }
};

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            Keys.w.pressed = true;
            break;
        case 'a':
            Keys.a.pressed = true;
            break;
        case 'd':
            Keys.d.pressed = true;
            break;
    }
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
            Keys.w.pressed = false;
            Keys.w.released = true;
            break;
        case 'a':
            Keys.a.pressed = false;
            Keys.a.released = true;
            break;
        case 'd':
            Keys.d.pressed = false;
            Keys.d.released = true;
            break;
    }
})