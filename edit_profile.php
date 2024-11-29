<!DOCTYPE html>
<html lang="es">

<head>
    <title>CapyWaves - Editar Perfil</title>

    <!-- JavaScript -->
    <script src="data/config.js"></script>
    <script src="data/main.js"></script>
    <script src="js/fontawesome/solid.js"></script>
    <script src="js/1.js"></script>
    <script src="js/menu_desplegable.js"></script>
    <script src="js/parallax.js"></script>
    <script src="js/scroll.js"></script>
    
    <!-- Stylesheets -->
    <link href="css/fontawesome/fontawesome.css" rel="stylesheet" />
    <link href="css/fontawesome/solid.css" rel="stylesheet" />
    <link href="css/header.css" rel="stylesheet" />
    <link href="css/edit_profile.css" rel="stylesheet" />
    <link href="css/parallax.css" rel="stylesheet" />
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/themes.css" rel="stylesheet" />
    
    <!-- Metadata -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Web Icons Import-->
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</head>

<body>
<header class="header">
    <div class="header-left">
        <a href="menu.php">
            <img src="fotos/logo1.gif" id="logo">
        </a>
    </div>
    <div class="header-center">
        <nav>
            <ul>
                <li><a href="#"> Inicio </a></li>
                <li><a href="#"> Explorar </a></li>
                <li><a href="#"> Nosotros</a></li>
            </ul>
        </nav>
    </div>
    <div class="header-right">
        <div class="profile-container">
            <img src="fotos/sinfoto.jpg" alt="Foto de perfil" class="profile-picture">
        </div>
    </div>
</header>

<div class="edit-container">
    <div class="edit-info">
        <h2 class="form-title">Editar perfil</h2>
        <form class="edit-form">
            <div class="form-inputs">
                <!-- Campo para el usuario -->
                <div class="input-box">
                    <input type="text" name="username" class="inputs input-field" placeholder="Usuario" required />
                    <ion-icon name="person-outline" class="icon"></ion-icon>
                </div>
                <!-- Campo para el nombre -->
                <div class="input-box">
                    <input type="text" name="nombre" class="inputs input-field" placeholder="Nombre(s)" required />
                    <ion-icon name="person-outline" class="icon"></ion-icon>
                </div>
                <!-- Campos para apellidos -->
                <div class="input-row">
                    <div class="input-box">
                        <input type="text" name="apellido_paterno" class="inputs input-field" placeholder="Apellido paterno" required />
                        <ion-icon name="person-outline" class="icon"></ion-icon>
                    </div>
                    <div class="input-box">
                        <input type="text" name="apellido_materno" class="inputs input-field" placeholder="Apellido materno" />
                        <ion-icon name="person-outline" class="icon"></ion-icon>
                    </div>
                </div>
                <!-- Campo para el correo -->
                <div class="input-box">
                    <input type="email" name="correo" class="inputs input-field" placeholder="Correo electrónico" required />
                    <ion-icon name="mail-outline" class="icon"></ion-icon>
                </div>
                <!-- Campo para la contraseña -->
                <div class="input-box">
                    <input type="password" name="contraseña" class="inputs input-field" placeholder="Contraseña" required />
                    <ion-icon name="lock-closed-outline" class="icon"></ion-icon>
                </div>
            </div>
            <div class="form-actions">
                <button type="submit" name="guardar" class="btn">Guardar cambios</button>
                <button type="reset" class="btn">Limpiar</button>
            </div>
        </form>
        
    </div>
    <div class="edit-photo">
        <div class="photo-container">
            <img src="fotos/sinfoto.jpg" alt="Foto de usuario" class="photo">
            <button class="camera-btn">
                <i class="fa fa-camera"></i>
            </button>
            <button class="btn upload-btn">Subir foto</button>
        </div>

        <a href="discos.php" class="btn redirect-btn">
            Ir a la página principal
            <ion-icon name="arrow-forward-outline"></ion-icon>
        </a>
        
    </div>
</div>
</body>
</html>





<!-- DESCARGAR PAGINA
 <button class="btn upload-btn redirect-btn" onclick="window.location.href='menu.php';">Ir a la página principal
            <ion-icon name="arrow-forward-outline"></ion-icon>
        </button> 
-->
