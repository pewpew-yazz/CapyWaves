<?php
    include_once "conexion.php";
    include "userFun.php";

    session_start();
    $username = $_SESSION['username'] ?? null;

    $userData = [];
    if ($username) {
        $userData = getUser($username);
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if (isset($_POST['guardar'])) {
            $username = $_POST['username'];
            $email = $_POST['correo'];
            $password = $_POST['contraseña'];
            $name = $_POST['nombre'];
            $apellidoP = $_POST['apellido_paterno'];
            $apellidoM = $_POST['apellido_materno'];

            if (updateUser($username, $email, $password, $name, $apellidoP, $apellidoM)) {
                echo "Datos actualizados correctamente.";
            } else {
                echo "Error al actualizar los datos.";
            }
            header("Location: discos.php");
            exit();
        }

        if (isset($_POST['upload_photo']) && isset($_FILES['profile_photo'])) {
            $photo = $_FILES['profile_photo'];
            $uploadDir = '../fotos/';
            $uploadFile = $uploadDir . basename($photo['name']);

            if (move_uploaded_file($photo['tmp_name'], $uploadFile)) {
                if (uploadPhoto($username, $uploadFile)) {
                    echo "Foto subida correctamente.";
                } else {
                    echo "Error al guardar la foto en la base de datos.";
                }
            } else {
                echo "Error al subir la foto.";
            }
            header("Location: edit_profile.php");
            exit();
        }
    }
?>


<!DOCTYPE html>
<html lang="es">

<head>
    <title>CapyWaves - Editar Perfil</title>

    <!-- JavaScript -->
    <script src="../data/config.js"></script>
    <script src="../data/main.js"></script>
    <script src="../js/fontawesome/solid.js"></script>
    
    <!-- Stylesheets -->
    <link href="../css/fontawesome/fontawesome.css" rel="stylesheet" />
    <link href="../css/fontawesome/solid.css" rel="stylesheet" />
    <link href="../css/headerlogo.css" rel="stylesheet" />
    <link href="../css/edit_profile.css" rel="stylesheet" />
    
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
            <img src="../fotos/logo1.gif" id="logo">
        </a>
    </div>
</header>

 <div class="edit-container">
        <div class="edit-info">
            <h2 class="form-title">Editar perfil</h2>
            <form class="edit-form" action="" method="post" autocomplete="off">
                <div class="form-inputs">
                    <div class="input-box">
                        <input type="text" name="username" class="inputs input-field" placeholder="Usuario" required value="<?= htmlspecialchars($userData['username'] ?? '') ?>"readonly/>
                        <ion-icon name="person-outline" class="icon"></ion-icon>
                    </div>
                    <div class="input-box">
                        <input type="text" name="nombre" class="inputs input-field" placeholder="Nombre(s)" required value="<?= htmlspecialchars($userData['nombre'] ?? '') ?>" />
                        <ion-icon name="person-outline" class="icon"></ion-icon>
                    </div>
                    <div class="input-row">
                        <div class="input-box">
                            <input type="text" name="apellido_paterno" class="inputs input-field" placeholder="Apellido paterno" required value="<?= htmlspecialchars($userData['apellido_P'] ?? '') ?>" />
                            <ion-icon name="person-outline" class="icon"></ion-icon>
                        </div>
                        <div class="input-box">
                            <input type="text" name="apellido_materno" class="inputs input-field" placeholder="Apellido materno" value="<?= htmlspecialchars($userData['apellido_M'] ?? '') ?>" />
                            <ion-icon name="person-outline" class="icon"></ion-icon>
                        </div>
                    </div>
                    <div class="input-box">
                        <input type="email" name="correo" class="inputs input-field" placeholder="Correo electrónico" required value="<?= htmlspecialchars($userData['email'] ?? '') ?>" />
                        <ion-icon name="mail-outline" class="icon"></ion-icon>
                    </div>
                    <div class="input-box">
                        <input type="password" name="contraseña" class="inputs input-field" placeholder="Contraseña" required value="<?= htmlspecialchars($userData['password'] ?? '') ?>" />
                        <ion-icon name="lock-closed-outline" class="icon"></ion-icon>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" name="guardar" class="btn">Guardar cambios</button>
                    <button type="reset" class="btn">Limpiar</button>
                    <a href="discos.php" class="btn redirect-btn">
                        Ir a la página principal
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </a>
                </div>
            </form>
        </div>
        <div class="edit-photo">
            <div class="photo-container">
                <img src="<?= htmlspecialchars($userData['photo'] ?? '../fotos/sinfoto.jpg') ?>" alt="Foto de usuario" class="photo">
                <form action="" method="POST" enctype="multipart/form-data">
                    <input type="file" id="profile_photo" name="profile_photo" accept="image/*" class="upload-btn">
                    <button type="submit" name="upload_photo" class="btn upload-btn">Subir nueva foto</button>
                </form>
            </div>
        </div>
    </div>
</body>
</html>





<!-- DESCARGAR PAGINA
 <button class="btn upload-btn redirect-btn" onclick="window.location.href='menu.php';">Ir a la página principal
            <ion-icon name="arrow-forward-outline"></ion-icon>
        </button> 
-->
