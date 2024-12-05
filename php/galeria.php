<?php
    require_once "logFun.php";
    require "userFun.php";


    $username = $_SESSION['username'];

    $userPhoto = getUserPhoto($username);



    if (isset($_GET['action']) && $_GET['action'] === 'logout') {
        logout();
    }
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <!-- Title -->
    <title>CapyWaves - Menu</title>

    <!-- JavaScript -->

    <script src="js/fontawesome/solid.js"></script>
    <script src="../js/menu_desplegable.js"></script>
    <script src="../js/inicio.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

    <!-- Stylesheets -->
    <link href="../css/headerusuario.css" rel="stylesheet" />
    <link href="../css/style.css" rel="stylesheet" />
    <link href="../css/fontawesome/fontawesome.css" rel="stylesheet" />
    <link href="../css/fontawesome/solid.css" rel="stylesheet" />
    <link href="../css/inicio.css" rel="stylesheet" />
    <link href="../css/colors.css" rel="stylesheet" />


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
<header class="header">
    <div class="header-left">
        <a href="<?php echo "galeria.php"; ?>">
            <img src="../fotos/logo2.png" id="logo">
        </a>
    </div>
    <div class="header-center">
        <nav>
           <ul>
                    


                    <li><a href="#">Explorar <span class="dropdown-arrow"><i class="fas fa-chevron-down"></i></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="../reproductor.html">Reproductor</a></li>
                            <li><a href="../juego/inicio.html">Videojuego</a></li>
                            <li><a href="../mlb/mlb.php">CapyWaves X MLB</a></li>
                        </ul>
                    </li>

                    <li><a href="#">Contacto <span class="dropdown-arrow"><i class="fas fa-chevron-down"></i></span></a>
                        <ul class="dropdown-menu">
                        <li><a href="about_us.php">¿Qué es CapyWaves?</a></li>
                            <li><a href="capy.php">Conoce a Capy</a></li>
                        </ul>
                    </li>

                    <li><a href="#">Tienda <span class="dropdown-arrow"><i class="fas fa-chevron-down"></i></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="https://capywaves.rdi.store/products">Productos</a></li>
                            <li><a href="https://capy-wabes-store.ola.click/products?product=entre-edificios-9da4">Escenarios exclusivos</a></li>
                        </ul>
                    </li>
          </ul>
        </nav>
    </div>
    <div class="header-right">
        <div class="profile-container">
        <img src="<?php echo $userPhoto ? "../fotos/" . $userPhoto : '../fotos/sinfoto.jpg'; ?>" alt="Foto de perfil" class="profile-picture">
            <i class="fas fa-chevron-down profile-arrow"></i>
            <ul class="dropdown-menu">
                <li><a href="edit_profile.php">Editar Información</a></li>
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
                    <h1 class="ti">El Coro de la Laguna                    </h1>
                    <div class="des">
                    Un islote mágico iluminado por un resplandor amarillo, rodeado de hongos púrpura y cañas llenas de luciérnagas. Tres ranas coloridas descansan, listas para entonar melodías en un entorno sereno y encantador.
                    </div>
                    <button class="r" onclick="location.href='../reproductor.html?song=0'">Reproducir</button>
                </div>
                <div class="item">
                    <h1 class="ti">Oasis Estelar                    </h1>
                    <div class="des">
                        Un vasto desierto bañado por un cielo dorado al atardecer, donde tres imponentes pirámides emergen majestuosas sobre la arena cálida. Un platillo volador flota misteriosamente en el horizonte, añadiendo un toque de ciencia ficción al paisaje antiguo. Pequeños cactus verdes decoran el primer plano, rompiendo la monotonía del árido terreno y aportando un elemento de vida al escenario enigmático. Una fusión perfecta entre lo antiguo y lo futurista
                    </div>
                    <button class="r" onclick="location.href='../reproductor.html?song=1'">Reproducir</button>
                </div>
                <div class="item">
                    <h1 class="ti">Navidad en el Bosque                    </h1>
                    <div class="des">
                    Un escenario invernal lleno de encanto donde un muñeco de nieve grita por su nariz, mientras un reno curioso observa la escena. Luces navideñas de colores decoran los árboles desnudos, iluminando un acogedor refugio de madera al fondo. La nieve cubre todo el paisaje, creando una atmósfera festiva y llena de humor.
                    </div>
                    <button class="r" onclick="location.href='../reproductor.html?song=2'">Reproducir</button>
                </div>
                <div class="item">
                    <h1 class="ti">Java Pixel</h1>
                    <div class="des">
                    Una acogedora cafetería estilo pixel art donde los personajes interactúan en un ambiente cálido y animado. Las luces colgantes iluminan suavemente el espacio, mientras el barista atiende tras una barra decorada con pasteles y café recién preparado. Las paredes verdes y los detalles minimalistas crean una atmósfera relajada, ideal para una pausa tranquila o una buena conversación entre amigos.
                    </div>
                    <button class="r" onclick="location.href='../reproductor.html?song=2'">Reproducir</button>
                </div>
                <div class="item">
                    <h1 class="ti">La Vigía del Cuervo                    </h1>
                    <div class="des">
                    Un escenario minimalista donde un cuervo negro descansa en el techo de una estructura moderna con amplias ventanas, destacando bajo un cielo despejado. A los lados, árboles dorados enmarcan la escena, creando un contraste cálido y elegante con el azul vibrante del fondo. Un entorno tranquilo que evoca misterio y observación.
                    </div>
                    <button class="r" onclick="location.href='../reproductor.html?song=2'">Reproducir</button>
                </div>
                <div class="item">
                    <h1 class="ti">Entre Edificios                    </h1>
                    <div class="des">
                    Un vecindario urbano con altos edificios de tonos cálidos, destacando sus ventanas simétricas y fachadas detalladas. En la cima de uno de los edificios, un gato curioso observa el horizonte mientras un cielo azul y nubes rosadas completan la escena. Un botón rojo añade un toque de travesura a este ambiente citadino.
                    </div>
                    <button class="r" onclick="location.href='../reproductor.html?song=5'">Reproducir</button>
                </div>
            </div>
            <!-- Flechas restauradas -->
            <button id="prev"><i class="fas fa-chevron-left"></i></button>
            <button id="next"><i class="fas fa-chevron-right"></i></button>
        </div>
    </div>


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
        <h3>Popular</h3>
        <img src="../images/escenariotop.png" alt="Canción popular">
      </div>


      <div class="favorites-box expandable">
      <span><i class="fas fa-heart"></i> Favoritos</span>
      <div class="dropdown-content">
          <ul>
              <li><i class="fas fa-heart"></i> Favorito 1</li>
              <li><i class="fas fa-heart"></i> Favorito 2</li>
              <li><i class="fas fa-heart"></i> Favorito 3</li>
              <li><i class="fas fa-heart"></i> Favorito 4</li>
          </ul>
     </div>
  </div>
</div>
      <!-- Favoritos -->
    



    <!-- Sección derecha -->
    <div class="right-section">
      <h4>Tu estado de ánimo</h4>
      <div class="mood-chart">
    <canvas id="moodChart" width="400" height="200"></canvas>
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
  <span><i class="fas fa-headphones"></i> Recomendaciones</span>
  <div class="dropdown-content">
      <ul>
          <li><i class="fas fa-music"></i> Recomendación 1</li>
          <li><i class="fas fa-music"></i> Recomendación 2</li>
          <li><i class="fas fa-music"></i> Recomendación 3</li>
          <li><i class="fas fa-music"></i> Recomendación 4</li>
      </ul>
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
            backgroundColor: ["#FFD700", "#FFA500", "#f96128", "#DC143C", "#8B0000", "#c50e0e"],
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

    <script src="../js/carrousel.js"></script>
</body>

</html>
