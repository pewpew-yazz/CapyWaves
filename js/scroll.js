// Detecta el evento de scroll
window.addEventListener("scroll", function() {
    const header = document.querySelector(".header");
    const btnLogin = document.querySelector(".btn-login");
    const btnRegister = document.querySelector(".btn-register");

    // Cambia el color de fondo cuando el usuario se desplaza 50 píxeles hacia abajo
    if (window.scrollY > 50) {
        header.style.backgroundColor = "#12addb"; // Cambia a azul

        // Cambia los colores de los botones
        btnLogin.style.backgroundColor = "#12addb"; // Azul
        btnLogin.style.color = "#ffffff"; // Texto blanco
        btnLogin.style.outlineColor = "#ffffff"; // Cambia el color del outline

        btnRegister.style.backgroundColor = "#ffffff"; // Blanco
        btnRegister.style.color = "#12addb"; // Texto azul
        btnRegister.style.outlineColor = "#12addb"; // Cambia el color del outline
    } else {
        header.style.backgroundColor = "#f29d43"; // Color original (naranja)

        // Restaura los colores originales de los botones
        btnLogin.style.backgroundColor = "#f29d43"; // Naranja
        btnLogin.style.color = "#ffffff"; // Texto blanco
        btnLogin.style.outlineColor = "#ffffff"; // Outline blanco

        btnRegister.style.backgroundColor = "#ffffff"; // Blanco
        btnRegister.style.color = "#f29d43"; // Texto naranja
        btnRegister.style.outlineColor = "#f29d43"; // Outline naranja
    }
});
