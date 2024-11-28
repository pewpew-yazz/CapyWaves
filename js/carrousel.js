let prev = document.getElementById('prev'); // Flecha izquierda
let next = document.getElementById('next'); // Flecha derecha
let image = document.querySelector('.images'); // Contenedor de las imágenes
let items = document.querySelectorAll('.images .item'); // Elementos individuales del carrusel (imágenes)
let contents = document.querySelectorAll('.content .item'); // Contenido asociado a cada disco

// Variables de control
let rotate = 0; // Rotación actual
let active = 0; // Elemento activo
let countItem = items.length; // Cantidad total de elementos
let rotateAdd = 360 / countItem; // Incremento de rotación por elemento

// Función para avanzar al siguiente disco
function nextSlider() {
    active = active + 1 > countItem - 1 ? 0 : active + 1; // Ciclar al primer elemento si llegamos al final
    rotate = rotate + rotateAdd; // Incrementar rotación
    show(); // Actualizar la visualización
}

// Función para retroceder al disco anterior
function prevSlider() {
    active = active - 1 < 0 ? countItem - 1 : active - 1; // Ciclar al último elemento si llegamos al principio
    rotate = rotate - rotateAdd; // Reducir rotación
    show(); // Actualizar la visualización
}

// Función para mostrar el elemento activo
function show() {
    image.style.setProperty("--rotate", rotate + 'deg'); // Aplicar rotación al contenedor
    contents.forEach((content, key) => {
        if (key == active) {
            content.classList.add('active'); // Activar contenido correspondiente
        } else {
            content.classList.remove('active'); // Desactivar contenido no relacionado
        }
    });
}

// Agregar eventos de clic a las flechas
next.onclick = nextSlider; // Avanzar al siguiente disco
prev.onclick = prevSlider; // Retroceder al disco anterior

// Agregar eventos de teclado para controlar el carrusel
document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextSlider(); // Avanzar al siguiente
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        prevSlider(); // Retroceder al anterior
    }
});
