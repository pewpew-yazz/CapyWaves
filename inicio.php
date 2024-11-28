<!DOCTYPE html>
<html lang="es">
<head>
  <!-- Metadata -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Título -->
  <title>CapyWaves</title>
  
  <!-- Estilos -->
  <link href="css/header1.css" rel="stylesheet" />
  <link href="css/footer.css" rel="stylesheet" />
  <link href="css/inicio.css" rel="stylesheet" />
  <link href="css/fontawesome/fontawesome.css" rel="stylesheet" />
  
  <!-- Librerías -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <!-- Header -->
  <header class="header">
    <div class="header-left">
      <a href="#">
        <img src="fotos/logo2.png" alt="Logo" id="logo">
      </a>
    </div>
    <div class="header-center">
      <nav>
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Explorar</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </nav>
    </div>
    <div class="header-right">
      <a href="login.php" class="btn-register">Registrarse</a>
      <a href="login.php" class="btn-login">Iniciar Sesión</a>
    </div>
  </header>

  <!-- Contenedor principal -->
  <div class="container">
    <!-- Sección izquierda -->
    <div class="left-section">
      <!-- Bienvenida -->
      <div class="welcome-box">
        <div class="welcome-content">
          <h2>Bienvenido a CapyWaves</h2>
          <p>La música es el lenguaje del alma, deja que te inspire cada día.</p>
        </div>
        <img class="welcome-image" src="fotos/capybara.png" alt="Capybara">
      </div>
      
      <!-- Popular -->
      <div class="popular-image">
        <img src="fotos/tu-imagen.png" alt="Canción popular">
      </div>
      
      <!-- Favoritos -->
      <div class="favorites-box expandable">
        <span>⭐ Favoritos</span>
        <div class="dropdown-content">
          <p>Tu lista de canciones favoritas aparecerá aquí.</p>
        </div>
      </div>
    </div>

    <!-- Sección derecha -->
    <div class="right-section">
      <h3>Tu estado de ánimo</h3>
      <div class="mood-chart">
        <canvas id="moodChart"></canvas>
      </div>
      <div class="mood-icons">
        <button onclick="registerMood(1)">😊</button>
        <button onclick="registerMood(2)">😁</button>
        <button onclick="registerMood(3)">😐</button>
        <button onclick="registerMood(4)">😢</button>
        <button onclick="registerMood(5)">😵</button>
        <button onclick="registerMood(6)">😡</button>
      </div>
      <div class="recommendations-box expandable">
        <span>🎵 Recomendaciones</span>
        <div class="dropdown-content">
          <p>Aquí aparecerán tus recomendaciones diarias.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Script para Gráficas -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const ctx = document.getElementById("moodChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["😊", "😁", "😐", "😢", "😵", "😡"],
          datasets: [{
            label: "Estado de ánimo",
            data: [5, 8, 3, 2, 6, 4], // Datos simulados
            backgroundColor: ["#FFD700", "#FFA500", "#FF4500", "#DC143C", "#8B0000", "#4B0082"],
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    });

    function registerMood(mood) {
      console.log("Estado de ánimo registrado:", mood);
    }
  </script>
</body>
</html>

