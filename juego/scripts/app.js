// Referencias al DOM
const scoreTable = document.getElementById('scoreTable').querySelector('tbody');
const clearScoresButton = document.getElementById('clearScores');

// Función para cargar los puntajes desde localStorage
function loadScores() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
  scoreTable.innerHTML = ''; // Limpia la tabla antes de añadir los puntajes
    scores.forEach((score, index) => {
    addRow(index + 1, score);
    });
}

// Función para añadir una fila a la tabla
function addRow(position, score) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${position}</td>
    <td>${score}</td>
    `;
    scoreTable.appendChild(row);
}

// Simulación del final de una partida (remplázalo con tu lógica real del juego)
function simulateGameEnd() {
  const finalScore = Math.floor(Math.random() * 100) + 1; // Genera un puntaje aleatorio
  saveScore(finalScore); // Guarda el puntaje al final de la partida
}

// Cargar los puntajes al iniciar
loadScores();

// Simular una partida automáticamente cada 5 segundos (para pruebas)
setInterval(simulateGameEnd, 5000); // Elimina esto cuando integres con el juego real
