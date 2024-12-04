const scoreTable = document.getElementById('scoreTable').querySelector('tbody');
const clearScoresButton = document.getElementById('clearScores');

function loadScores() {
    const scores = JSON.parse(localStorage.getItem('playerScores')) || [];
    const scoreTable = document.getElementById('scoreTable').querySelector('tbody');
    scoreTable.innerHTML = ''; // Limpia la tabla para evitar duplicados
    scores.forEach((score, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${score}</td>
        `;
        scoreTable.appendChild(row);
    });
    // Seleccionar el botón para limpiar los scores
const clearScoresButton = document.getElementById("clear-scores");

// Agregar un evento al botón
clearScoresButton.addEventListener("click", () => {
  // Confirmar la acción con el usuario
const confirmClear = confirm("¿Estás seguro de que quieres limpiar todos los scores?");
if (confirmClear) {
    // Eliminar los scores del localStorage
    localStorage.removeItem("scores");

    // Vaciar la tabla de puntajes
    const tableBody = document.querySelector("#scoreTable tbody");
    tableBody.innerHTML = "";

    // Vaciar el mensaje del último puntaje
    const lastScoreContainer = document.getElementById("lastScoreContainer");
    lastScoreContainer.innerHTML = "";

    // Mostrar un mensaje al usuario
    alert("¡Todos los scores han sido limpiados!");
}
});
}


// Llama a loadScores() para mostrar los puntajes
loadScores();
