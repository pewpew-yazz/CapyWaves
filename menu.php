<!DOCTYPE html>
<html lang="es">

<head>
   <!-- Title -->
   <title>CapyWaves</title>

    <!-- JavaScript -->
    <script src="js/fontawesome/solid.js"></script>
    <script src="js/scroll.js"></script>

    <!-- Stylesheets -->       <!-- No agregar login.css -->
    <link href="css/header1.css" rel="stylesheet" />
    <link href="css/footer.css" rel="stylesheet" />
    <link href="css/parallax.css" rel="stylesheet" />
    <link href="css/fontawesome/fontawesome.css" rel="stylesheet" />
    <link href="css/fontawesome/solid.css" rel="stylesheet" />

    <!-- Metadata -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Web Icons Import-->
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

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
            <a href="#">
                <img src="fotos/logo2.png" id="logo">
            </a>
        </div>
        <div class="header-center">
            <nav>
                <ul>
                    <li><a href="#">Inicio <span class="dropdown-arrow"><i class="fas fa-chevron-down"></i></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Submenu 1</a></li>
                            <li><a href="#">Submenu 2</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Explorar <span class="dropdown-arrow"><i class="fas fa-chevron-down"></i></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Submenu 1</a></li>
                            <li><a href="#">Submenu 2</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Contacto <span class="dropdown-arrow"><i class="fas fa-chevron-down"></i></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Submenu 1</a></li>
                            <li><a href="#">Submenu 2</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="header-right">
            <a href="<?php echo "login.php";?>" class="btn-register">Registrarse</a>
            <a href="login.php" class="btn-login">Iniciar Sesión</a>

        </div>
    </header>





    <section class="parallax">
        <img src="fotos/cieloR.png" id="cielo">
        <img src="fotos/solR.png" id="sol">
        <img src="fotos/nubesR.png" id="nubes">
        <h1 id="text1">Encuentra tu calma en cada ola de relajación</h1>
        <p id="text2">Explora escenarios interactivos y déjate llevar por la música que alivia tu mente.</p>
        <img src="fotos/montañas1.1.png" id="montañas1-1">
        <img src="fotos/montañas1.2.png" id="montañas1-2">
        <img src="fotos/montañas2.1.png" id="montañas2-1">
        <img src="fotos/montañas2.2.png" id="montañas2-2">
        <img src="fotos/pastoR.png" id="pasto">
        <img src="fotos/pinos1.png" id="pinos1">
        <img src="fotos/pinos2.png" id="pinos2">
        <img src="fotos/capyR.png" id="capy">
    </section>


    <section class="section2">
        <h2>Tu refugio de calma</h2>
        <p>
            Explora mundos interactivos y déjate envolver por sonidos <br> relajantes. Capy Waves está aquí para ayudarte a encontrar tu paz.
        </p>
        <img class="imagen1" src="fotos/capybara1.png">
    </section>

    <section class="section3">
        <div class="columns-container">
            <div class="column" id="costa-de-susurros">
                <h3>Costa de Susurros</h3>
                <img src="fotos/esc3.png" alt="Costa de Susurros">
                <div class="text-overlay">
                    <p>Relájate con el sonido de las olas y la <br>brisa marina, mientras las gaviotas <br> vuelan sobre un mar sereno.</p>
                </div>
            </div>
            <div class="column" id="prado-de-calma">
                <h3>Prado de Calma</h3>
                <img src="fotos/esc2.png" alt="Prado de Calma">
                <div class="text-overlay">
                    <p>Un prado de flores silvestres se mece <br> suavemente con el viento, rodeado de la  <br> sinfonía natural de la calma.</p>
                </div>
            </div>
            <div class="column" id="noche-entre-edificios">
                <h3>Noche entre Edificios</h3>
                <img src="fotos/esc1.png" alt="Noche entre Edificios">
                <div class="text-overlay">
                    <p>Una ciudad iluminada bajo el cielo  <br> estrellado, donde las luces reflejan historias  <br>de calma y misterio.</p>
                </div>
            </div>
        </div>
        <a href="#" class="discover-more">
            Descubre más
            <div class="circle-arrow">
                <i class="fas fa-arrow-right"></i> <!-- Usando el ícono de FontAwesome -->
            </div>
        </a>
    </section>
    
    <section class="third-section">
        <div class="benefits-left">
            <h3>Beneficios de usar Capy Waves</h3>
        </div>
        <div class="benefits-right">
            <ul>
                <li>• Música relajante que calma tu mente.</li>
                <li>• Escenarios interactivos que te ayudan a desconectar.</li>
                <li>• Experiencias personalizadas para tu bienestar.</li>
            </ul>
        </div>
    </section>

    <section class="fourth-section">
        <h3>Únete a nuestra comunidad de personas que <br> han descubierto la paz en Capy Waves.</h3>
        <button class="btn-register-cta">Registrarse</button>
        <div class="image-placeholder">
            <img src="fotos/capybara2.png">
        </div>
    </section>
    
    <footer class="footer">
        <div class="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61567059332868"><ion-icon name="logo-facebook"></ion-icon></a>
            <a href="https://www.instagram.com/capywaves/"><ion-icon name="logo-instagram"></ion-icon></a>
            <a href="https://mx.pinterest.com/capywaves/"><ion-icon name="logo-pinterest"></ion-icon></a>
            <a href="https://www.youtube.com/@CapyWaves"><ion-icon name="logo-youtube"></ion-icon></a>
        </div>
        <p>Copyright y créditos: © 2024 Capy Waves. Todos los derechos reservados.</p>
    </footer>
    

</div>

    <script src="js/parallax.js"></script>
    
</body>

</html>



