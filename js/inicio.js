let moodChart; // Declaración global de la gráfica

document.addEventListener("DOMContentLoaded", () => {
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
});

// Aquí va la función registerMood
function registerMood(mood) {
  console.log("Estado de ánimo registrado:", mood);

  // Incrementar el valor correspondiente en los datos de la gráfica
  moodChart.data.datasets[0].data[mood - 1] += 1;

  // Actualizar la gráfica
  moodChart.update();
}