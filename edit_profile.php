<!DOCTYPE html>
<html lang="es">

<head>
    <title>CapyWaves - Editar Perfil</title>

    <!-- JavaScript -->
    <script src="data/config.js"></script>
    <script src="data/main.js"></script>
    <script src="js/fontawesome/solid.js"></script>
    
    <!-- Stylesheets -->
    <link href="css/fontawesome/fontawesome.css" rel="stylesheet" />
    <link href="css/fontawesome/solid.css" rel="stylesheet" />
    <link href="css/headerlogo.css" rel="stylesheet" />
    <link href="css/edit_profile.css" rel="stylesheet" />
    
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
        <form action="edit_profile.php" method="POST" enctype="multipart/form-data">
            <!-- Campo de subir archivo oculto -->
            <input type="file" id="profile_photo"  class="btn upload-btn" name="profile_photo" accept="image/*" required>
            <!-- Botón estilizado -->
            
            <button type="submit" name="upload_photo" class="btn upload-btn">Subir foto</button>
        </form>
    </div>
    <a href="php/discos.php" class="btn redirect-btn">
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
