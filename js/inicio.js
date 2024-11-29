let moodChart; // Declaración global de la gráfica

document.addEventListener("DOMContentLoaded", () => {
    // Inicialización de la gráfica de estados de ánimo
    const ctx = document.getElementById("moodChart").getContext("2d");
    moodChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["😊", "😁", "😐", "😢", "😵", "😡"],
            datasets: [{
                label: "Estado de ánimo",
                data: [5, 8, 3, 2, 6, 4], // Datos simulados iniciales
                backgroundColor: ["#FFD700", "#FFA500", "#FF4500", "#DC143C", "#8B0000", "#4B0082"],
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true },
                x: { title: { display: true, text: "Emociones" } }
            }
        }
    });

    // Manejar favoritos desplegables
    const favoritesBox = document.querySelector(".favorites-box");

    // Verifica si el elemento existe antes de añadir eventos
    if (favoritesBox) {
        // Abrir y cerrar favoritos al hacer clic
        favoritesBox.addEventListener("click", (event) => {
            event.stopPropagation(); // Evita que el clic cierre el desplegable
            favoritesBox.classList.toggle("active");
        });

        // Cerrar favoritos al hacer clic fuera
        document.addEventListener("click", (event) => {
            if (!favoritesBox.contains(event.target)) {
                favoritesBox.classList.remove("active");
            }
        });
    } else {
        console.error("El elemento .favorites-box no fue encontrado.");
    }
});

// Función para registrar estados de ánimo
function registerMood(mood) {
    console.log("Estado de ánimo registrado:", mood);

    // Incrementar el valor correspondiente en los datos de la gráfica
    moodChart.data.datasets[0].data[mood - 1] += 1;

    // Actualizar la gráfica
    moodChart.update();
}
