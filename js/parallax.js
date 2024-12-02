//Parallax pagina principal

// Elementos del parallax
let sol = document.getElementById('sol');
let nubes = document.getElementById('nubes');
let montañas1_1 = document.getElementById('montañas1-1');
let montañas1_2 = document.getElementById('montañas1-2');
let montañas2_1 = document.getElementById('montañas2-1');
let montañas2_2 = document.getElementById('montañas2-2');
let pasto = document.getElementById('pasto');
let pinos1 = document.getElementById('pinos1');
let pinos2 = document.getElementById('pinos2');
let capy = document.getElementById('capy');
let text1 = document.getElementById('text1');
let text2 = document.getElementById('text2');

// Lista de frases para cambiar aleatoriamente
const frases = [
    "Explora la tranquilidad, una ola a la vez.",
    "Encuentra tu equilibrio en cada pixel.",
    "Relájate, respira y conecta con la calma.",
    "Tu refugio contra el estrés, a un clic de distancia.",
    "Donde el sonido y la paz se encuentran.",
    "Desconéctate del ruido, conéctate contigo.",
    "Un respiro digital para tu día.",
    "La tranquilidad está a un clic.",
    "Pausa, respira, relájate.",
    "Dale un descanso a tu mente, hoy."
];

// Cambiar la frase al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
    text1.textContent = fraseAleatoria;
});

// Parallax: efecto de desplazamiento
window.addEventListener('scroll', () =>{
    let value = window.scrollY;

    text1.style.marginTop = value * 2.5 + 'px';
    text2.style.marginTop = value * 2.5 + 'px';
    montañas1_1.style.left = value * -1.5 + 'px';
    montañas1_2.style.left = value * 1.5 + 'px';
    pinos1.style.left = value * -1.5 + 'px';
    pinos2.style.left = value * 1.5 + 'px';
    nubes.style.top = value * 1.5 + 'px';
    nubes.style.top = `translateY(${scrollTop * -2.2}px)`;   // Se moverá a la izquierda
    montañas1_1.style.left = `translateY(${scrollTop * -2.2}px)`;   // Se moverá a la izquierda
    montañas1_2.style.transform = `translateY(${scrollTop * 0.4}px)`;    // Se moverá a la derecha
    montañas2_1.style.transform = `translateY(${scrollTop * -0.5}px)`;   // Se moverá a la izquierda
    montañas2_2.style.transform = `translateY(${scrollTop * 0.5}px)`;    // Se moverá a la derecha
  
});
