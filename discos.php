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
    <link href="css/style.css" rel="stylesheet" />
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
</head>

<body>
    <header class="header">
        <div class="header-left">
            <a href="<?php echo "menu.php";?>">
                <img src="fotos/logo1.gif" id="logo">
            </a>
        </div>
        <div class="header-center">
            <nav>
                <ul>
                    <li><a href="#"> Inicio <span class="dropdown-arrow"><i class="fas fa-chevron-down"></i></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Submenu 1</a></li>
                            <li><a href="#">Submenu 2</a></li>
                        </ul>
                    </li>
                    <li><a href="#"> Explorar <span class="dropdown-arrow"><i class="fas fa-chevron-down"></i></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Submenu 1</a></li>
                            <li><a href="#">Submenu 2</a></li>
                        </ul>
                    </li>
                    <li><a  href="#" class=""> Nosotros</a></li>
                       
                           
                    
                </ul>
            </nav>
        </div>
        <div class="header-right">
            <div class="profile-container">
                <img src="fotos/sinfoto.jpg" alt="Foto de perfil" class="profile-picture">
                <i class="fas fa-chevron-down profile-arrow"></i>
            </div>
        </div>
       
    </header>

    <div class="main-content">
    <div class="slider">
        <div class="title">
           
        </div>
        <div class="images">
            <div class="item" style="--i: 1;">
                <img src="fotos/disco1.png">
            </div>
            <div class="item" style="--i: 2;">
                <img src="fotos/disco2.png">
            </div>
            <div class="item" style="--i: 3;">
                <img src="fotos/disco6.png">
            </div>
            <div class="item" style="--i: 4;">
                <img src="fotos/disco3.png">
            </div>
            <div class="item" style="--i: 5;">
                <img src="fotos/disco4.png">
            </div>
            <div class="item" style="--i: 6;">
                <img src="fotos/disco5.png">
            </div>
        </div>
        <div class="content">
            <div class="item active">
                <h1 class="ti">Costa de susurros</h1>
                <div class="des">
                    Camina por la orilla de un océano sereno, donde las olas susurran secretos antiguos y la brisa salada acaricia tu piel. Las notas relajantes de este disco te sumergen en un mar de paz y suaves olas que abrazan tus sentidos.
                </div>
                <button class="r">Reproducir</button>
            </div>
            <div class="item">
                <h1 class="ti">Noche entre Edificios</h1>
                <div class="des">
                    Explora el pulso tranquilo de la ciudad por la noche, cuando las luces de los edificios parpadean como estrellas urbanas. Este disco combina el murmullo lejano de la ciudad con un ritmo relajante que te invita a disfrutar de la calma urbana.
                </div>
                <button class="r">Reproducir</button>
            </div>
            <div class="item">
                <h1 class="ti">Noche de Luna Llena</h1>
                <div class="des">
                    Bajo la luz plateada de una luna llena, el mundo se baña en un resplandor mágico. Este disco evoca la majestuosa serenidad de una noche iluminada por la luna, llena de misterio y belleza nocturna que invita a la reflexión.
                </div>
                <button class="r">Reproducir</button>
            </div>
            <div class="item">
                <h1 class="ti">Prado de Calma</h1>
                <div class="des">
                    Descansa en un amplio prado donde el viento acaricia la hierba y los colores del atardecer pintan el cielo. Las melodías suaves y las brisas armoniosas de este disco te ayudarán a encontrar un momento de pura serenidad.
                </div>
                <button class="r">Reproducir</button>
            </div>
            <div class="item">
                <h1 class="ti">Fogata Bajo Estrellas</h1>
                <div class="des">
                    Reúnete alrededor de una fogata chisporroteante bajo un cielo estrellado infinito. Este disco recrea la calidez y la conexión de una noche al aire libre, con crujidos de madera y estrellas que susurran historias de antaño.
                </div>
                <button class="r">Reproducir</button>
            </div>
            <div class="item">
                <h1 class="ti">Bosque de Luciérnagas</h1>
                <div class="des">
                    Adéntrate en un bosque mágico donde las luciérnagas iluminan la noche con su danza luminosa. Este disco captura la tranquilidad y el asombro de caminar entre luces titilantes, envolviéndote en un susurro de naturaleza y misticismo.
                </div>
                <button class="r">Reproducir</button>
            </div>
        </div>
        <button id="prev"><i class="fas fa-chevron-left"></i></button>
        <button id="next"><i class="fas fa-chevron-right"></i></button>

    </div>
</div>

    <script src="js/carrousel.js"></script>
</body>

</html>