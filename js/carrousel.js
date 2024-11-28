let prev = document.getElementById('prev');
let next = document.getElementById('next');
let image = document.querySelector('.images');
let items = document.querySelectorAll('.images .item');
let contents = document.querySelectorAll('.content .item');

let rotate = 0;
let active = 0;
let countItem = items.length;
let rotateAdd = 360 / countItem;

function nextSlider() {
    active = active + 1 > countItem - 1 ? 0 : active + 1;
    rotate = rotate + rotateAdd;
    show();
}

function prevSlider() {
    active = active - 1 < 0 ? countItem - 1 : active - 1;
    rotate = rotate - rotateAdd;
    show();
}

function show() {
    image.style.setProperty("--rotate", rotate + 'deg');
    contents.forEach((content, key) => {
        if (key == active) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    })
}

next.onclick = nextSlider;
prev.onclick = prevSlider;

// Agregar event listeners para las flechas del teclado
document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextSlider();  // Avanzar al siguiente
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        prevSlider();  // Retroceder al anterior
    }
});
