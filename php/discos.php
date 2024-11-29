<?php
    require_once "logFun.php";

    if (isset($_GET['action']) && $_GET['action'] === 'logout') {
        logout(); // Llamar a la función logout si se solicita
    }
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <!-- Title -->
    <title>CapyWaves discos</title>

    <!-- JavaScript -->
    <script src="js/fontawesome/solid.js"></script>
    <script src="js/menu_desplegable.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

    <!-- Stylesheets -->
    <link href="../css/style.css" rel="stylesheet" />
    <link href="../css/headerusuario.css" rel="stylesheet" />
    <link href="../css/fontawesome/fontawesome.css" rel="stylesheet" />
    <link href="../css/fontawesome/solid.css" rel="stylesheet" />
    <link href="../css/inicio.css" rel="stylesheet" />


    <!-- Metadata -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Jersey+10&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap"
        rel="stylesheet">
</head>

<body>
<header class="header">
    <div class="header-left">
        <a href="<?php echo "../menu.php"; ?>">
            <img src="../fotos/logo2.png" id="logo">
        </a>
    </div>
    <div class="header-center">
        <nav>
            <ul>
                <li>
                    <a href="#">Inicio <span class="dropdown-arrow"><i class="fas fa-chevron-down"></i></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Submenu 1</a></li>
                        <li><a href="#">Submenu 2</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#">Explorar <span class="dropdown-arrow"><i class="fas fa-chevron-down"></i></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Submenu 1</a></li>
                        <li><a href="#">Submenu 2</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#">Nosotros</a>
                </li>
            </ul>
        </nav>
    </div>
    <div class="header-right">
        <div class="profile-container">
            <img src="../fotos/sinfoto.jpg" alt="Foto de perfil" class="profile-picture">
            <i class="fas fa-chevron-down profile-arrow"></i>
            <ul class="dropdown-menu">
                <li><a href="../editar_perfil.hmtl">Editar Información</a></li>
                <li><a href="../favoritos.php">Favoritos</a></li>
                <li><a href="?action=logout">Cerrar Sesión</a></li>
            </ul>
        </div>
    </div>
</header>

    <div class="main-content">
        <div class="slider">
            <div class="images">
                <div class="item" style="--i: 1;">
                    <img src="../fotos/disco1.png">
                </div>
                <div class="item" style="--i: 2;">
                    <img src="../fotos/disco2.png">
                </div>
                <div class="item" style="--i: 3;">
                    <img src="../fotos/disco6.png">
                </div>
                <div class="item" style="--i: 4;">
                    <img src="../fotos/disco3.png">
                </div>
                <div class="item" style="--i: 5;">
                    <img src="../fotos/disco4.png">
                </div>
                <div class="item" style="--i: 6;">
                    <img src="../fotos/disco5.png">
                </div>
            </div>
            <div class="content">
                <div class="item active">
                    <h1 class="ti">Costa de susurros</h1>
                    <div class="des">
                        Camina por la orilla de un océano sereno, donde las olas susurran secretos antiguos y la brisa salada acaricia tu piel.
                    </div>
                    <button class="r" onclick="location.href='reproductor.html?song=0'">Reproducir</button>
                </div>
                <div class="item">
                    <h1 class="ti">Noche entre Edificios</h1>
                    <div class="des">
                        Explora el pulso tranquilo de la ciudad por la noche, cuando las luces de los edificios parpadean como estrellas urbanas.
                    </div>
                    <button class="r" onclick="location.href='reproductor.html?song=1'">Reproducir</button>
                </div>
                <div class="item">
                    <h1 class="ti">Noche de Luna Llena</h1>
                    <div class="des">
                        Bajo la luz plateada de una luna llena, el mundo se baña en un resplandor mágico.
                    </div>
                    <button class="r" onclick="location.href='reproductor.html?song=2'">Reproducir</button>
                </div>
                <div class="item">
                    <h1 class="ti">Prado de Calma</h1>
                    <div class="des">
                        Descansa en un amplio prado donde el viento acaricia la hierba y los colores del atardecer pintan el cielo.
                    </div>
                    <button class="r" onclick="location.href='reproductor.html?song=3'">Reproducir</button>
                </div>
                <div class="item">
                    <h1 class="ti">Fogata Bajo Estrellas</h1>
                    <div class="des">
                        Reúnete alrededor de una fogata chisporroteante bajo un cielo estrellado infinito.
                    </div>
                    <button class="r" onclick="location.href='reproductor.html?song=4'">Reproducir</button>
                </div>
                <div class="item">
                    <h1 class="ti">Bosque de Luciérnagas</h1>
                    <div class="des">
                        Adéntrate en un bosque mágico donde las luciérnagas iluminan la noche con su danza luminosa.
                    </div>
                    <button class="r" onclick="location.href='reproductor.html?song=5'">Reproducir</button>
                </div>
            </div>
            <!-- Flechas restauradas -->
            <button id="prev"><i class="fas fa-chevron-left"></i></button>
            <button id="next"><i class="fas fa-chevron-right"></i></button>
        </div>
    </div>

    <head>
    <!-- Title -->
    <title>CapyWaves discos</title>

    <!-- JavaScript -->
    <script src="js/fontawesome/solid.js"></script>
    <script src="js/menu_desplegable.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

    <!-- Stylesheets -->
    <link href="css/inicio.css" rel="stylesheet" />
    <link href="css/header.css" rel="stylesheet" />
    <link href="css/fontawesome/fontawesome.css" rel="stylesheet" />
    <link href="css/fontawesome/solid.css" rel="stylesheet" />

    <!-- Metadata -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Jersey+10&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap"
        rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <!-- Header -->
  <header class="header">
    <div class="header-left">
        <a href="<?php echo "menu.php"; ?>">
            <img src="../fotos/logo2.png" id="logo">
        </a>
    </div>
    <div class="header-center">
        <nav>
            <ul>
                <li>
                    <a href="#">Inicio <span class="dropdown-arrow"><i class="fas fa-chevron-down"></i></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Submenu 1</a></li>
                        <li><a href="#">Submenu 2</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#">Explorar <span class="dropdown-arrow"><i class="fas fa-chevron-down"></i></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Submenu 1</a></li>
                        <li><a href="#">Submenu 2</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#">Nosotros</a>
                </li>
            </ul>
        </nav>
    </div>
    <div class="header-right">
        <div class="profile-container">
            <img src="../fotos/sinfoto.jpg" alt="Foto de perfil" class="profile-picture">
            <i class="fas fa-chevron-down profile-arrow"></i>
            <ul class="dropdown-menu">
                <li><a href="editar_perfil.html">Editar Información</a></li>
                <li><a href="favoritos.php">Favoritos</a></li>
                <li><a href="php/logout.php">Cerrar Sesión</a></li>
            </ul>
        </div>
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
        <img class="welcome-image" src="../images/capy.gif" alt="Capybara">
      </div>
      
      <!-- Popular -->
      <div class="popular-image">
        <img src="../images/escenariotop.png" alt="Canción popular">
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

    <script src="js/carrousel.js"></script>
</body>

</html>
