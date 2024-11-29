let moodChart; // Declaración global de la gráfica

document.addEventListener("DOMContentLoaded", async () => {
    // Manejar la gráfica de emociones
    try {
        const ctx = document.getElementById("moodChart").getContext("2d");

        // Obtener datos de emociones desde el servidor
        const response = await fetch("php/emociones.php");
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const emotionsData = await response.json();

        // Extraer etiquetas y datos
        const labels = emotionsData.map((item) => item.emocion);
        const data = emotionsData.map((item) => item.cantidad);

        // Crear la gráfica
        moodChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Tus emociones",
                        data: data,
                        backgroundColor: ["#FFD700", "#FFA500", "#FF4500", "#DC143C", "#8B0000", "#4B0082"],
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true },
                    x: { title: { display: true, text: "Emociones" } },
                },
            },
        });
    } catch (error) {
        console.error("Error al cargar los datos para la gráfica:", error);
    }

    // Manejar cajas desplegables (Favoritos, Recomendaciones, etc.)
    const expandableBoxes = document.querySelectorAll(".expandable");

    expandableBoxes.forEach((box) => {
        // Abrir/cerrar la caja al hacer clic
        box.addEventListener("click", (event) => {
            event.stopPropagation(); // Evita que el clic cierre inmediatamente
            box.classList.toggle("active");
        });
    });

    // Cerrar todas las cajas al hacer clic fuera de ellas
    document.addEventListener("click", () => {
        expandableBoxes.forEach((box) => box.classList.remove("active"));
    });
});

// Función para registrar estados de ánimo
function registerMood(mood) {
    if (moodChart && moodChart.data.datasets[0]) {
        console.log("Estado de ánimo registrado:", mood);

        // Incrementar el valor correspondiente en los datos de la gráfica
        moodChart.data.datasets[0].data[mood - 1] += 1;

        // Actualizar la gráfica
        moodChart.update();
    } else {
        console.error("La gráfica no está inicializada.");
    }
}

// Función opcional para actualizar la gráfica manualmente
function updateMoodChart(newData) {
    if (moodChart && moodChart.data.datasets[0]) {
        moodChart.data.datasets[0].data = newData; // Actualizar datos
        moodChart.update(); // Redibujar la gráfica
    } else {
        console.error("La gráfica no está inicializada.");
    }
}
