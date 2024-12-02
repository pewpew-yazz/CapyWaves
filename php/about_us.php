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
    <title>CapyWaves - Nosotros</title>

    <!-- JavaScript -->
    <script src="../js/fontawesome/solid.js"></script>
    <script src="../js/menu_desplegable.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

    <!-- Stylesheets -->
    <link href="../css/us.css" rel="stylesheet" />
    <link href="../css/footer.css" rel="stylesheet" />
    <link href="../css/headerusuario.css" rel="stylesheet" />
    <link href="../css/fontawesome/fontawesome.css" rel="stylesheet" />
    <link href="../css/fontawesome/solid.css" rel="stylesheet" />

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
                    <li><a href="#">Inicio <span class="dropdown-arrow"><i class="fas fa-chevron-down"></i></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="menu.php">Principal</a></li>
                            <li><a href="discos.php">Inicio</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Explorar <span class="dropdown-arrow"><i class="fas fa-chevron-down"></i></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="discos.php">Galeria</a></li>
                            <li><a href="../reproductor.html">Reproductor</a></li>
                            <li><a href="../juego/inicio.html">Videojuego</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Contacto <span class="dropdown-arrow"><i class="fas fa-chevron-down"></i></span></a>
                        <ul class="dropdown-menu">
                        <li><a href="about_us.php">Sobre nosotros</a></li>
                            <li><a href="capy.php">Sobre Capy</a></li>
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

    <!-- Sección Sobre Nosotros -->
    <section class="about-us">
        <h2>Sobre Nosotros</h2>
        <div class="about-container">
            <div class="about-text">
                <p>
                Nuestra plataforma ofrece videos interactivos con música relajante y escenarios en pixel art, diseñados
                para ayudarte a reducir el estrés y la ansiedad. Brindamos una experiencia inmersiva y calmante, donde puedes
                personalizar y explorar distintos entornos, todo pensado para ofrecer un escape digital que mejore tu bienestar.
                </p>
                <p>
                    Inspirados por la serenidad de la naturaleza y la simplicidad de los capibaras, CapyWaves busca ser
                    tu refugio virtual, donde puedas encontrar calma y equilibrio en cualquier momento y lugar.
                </p>
            </div>
            <div class="about-image">
                <img src="../fotos/capy_logo.png" alt="Nuestro equipo" />
            </div>
        </div>
    </section>

    <section class="benefits">
        <h2>Nuestros Beneficios</h2>
        <div class="benefits-container">
            <div class="benefit-item">
                <ion-icon name="headset-outline" class="benefit-icon"></ion-icon>
                <h3>Relajación Personalizada</h3>
                <p>Descubre una experiencia única de relajación combinando música y escenarios visuales adaptados a tus emociones.</p>
            </div>
            <div class="benefit-item">
                <ion-icon name="earth-outline" class="benefit-icon"></ion-icon>
                <h3>Acceso Global</h3>
                <p>Conéctate desde cualquier lugar y momento para disfrutar de un refugio virtual dondequiera que estés.</p>
            </div>
            <div class="benefit-item">
                <ion-icon name="heart-outline" class="benefit-icon"></ion-icon>
                <h3>Bienestar Integral</h3>
                <p>Fomenta la paz interior, reduce el estrés y mejora tu bienestar emocional con nuestras experiencias inmersivas.</p>
            </div>
        </div>
    </section>

        <!-- Sección Público Dirigido -->
    <section class="target-audience">
        <h2>¿A Quién Nos Dirigimos?</h2>
        <div class="audience-container">
            <div class="audience-item">
                <ion-icon name="briefcase-outline" class="audience-icon"></ion-icon>
                <h3>Profesionales Estresados</h3>
                <p>Personas con trabajos demandantes que buscan una forma efectiva de reducir el estrés y aumentar su productividad.</p>
            </div>
            <div class="audience-item">
                <ion-icon name="school-outline" class="audience-icon"></ion-icon>
                <h3>Estudiantes</h3>
                <p>Jóvenes en búsqueda de equilibrio emocional y un espacio para desconectar de sus rutinas de estudio.</p>
            </div>
        </div>
    </section>


    <!-- Footer -->
    <footer class="footer">
        <div class="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61567059332868"><ion-icon name="logo-facebook"></ion-icon></a>
            <a href="https://www.instagram.com/capywaves/"><ion-icon name="logo-instagram"></ion-icon></a>
            <a href="https://mx.pinterest.com/capywaves/"><ion-icon name="logo-pinterest"></ion-icon></a>
            <a href="https://www.youtube.com/@CapyWaves"><ion-icon name="logo-youtube"></ion-icon></a>
        </div>
        <p>Copyright y créditos: © 2024 Capy Waves. Todos los derechos reservados.</p>
    </footer>
</body>

</html>
