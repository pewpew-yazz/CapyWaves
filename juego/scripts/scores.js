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
}

// Llama a loadScores() para mostrar los puntajes
loadScores();
