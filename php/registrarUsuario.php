<?php 
require_once "/php/registro.php";
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $user = $_POST['username'];
    $name = $_POST['nombre'];
    $lastname1 = $_POST['apellido_paterno'];
    $lastname2 = $_POST['apellido_materno'];
    $email = $_POST['correo'];
    $password = $_POST['contraseña'];

    if(registroUsuario($user,$name,$lastname1,$lastname2,$email,$password)){
        error_log("Login succesfull for ".$_SESSION['num']);
        header("Location: ../discos.php");
        exit();
    }
}
?>

<head>
    <!-- Title -->
    <title>CapyWaves - Registro</title>

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
    <link href="css/login.css" rel="stylesheet" />
    <link href="css/parallax.css" rel="stylesheet" />
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/themes.css" rel="stylesheet" />

    <!-- Metadata -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Jersey+10&display=swap" rel="stylesheet">
</head>

<body>
    <div class="form-container">
        <div class="form-col">
            <!-- Register Form (Registrarse) -->
            <form class="form-box register-form" method="post" action="../discos.php">
                <div class="form-title">
                    <span>Regístrate</span>
                </div>
                <div class="form-inputs">
                    <!-- Campo para el usuario -->
                    <div class="input-box">
                        <input type="text" name="username" class="inputs input-field" placeholder="Usuario" required />
                        <ion-icon name="person-outline" class="icon"></ion-icon>
                    </div>
                    <!-- Campo para el nombre -->
                    <div class="input-box">
                        <input type="text" name="nombre" class="inputs input-field" placeholder="Nombre" required />
                        <ion-icon name="person-outline" class="icon"></ion-icon>
                    </div>
                    <!-- Campos para apellidos -->
                    <div class="input-row">
                        <div class="input-box">
                            <input type="text" name="apellido_paterno" class="inputs input-field"
                                placeholder="Apellido paterno" required />
                            <ion-icon name="person-outline" class="icon"></ion-icon>
                        </div>
                        <div class="input-box">
                            <input type="text" name="apellido_materno" class="inputs input-field"
                                placeholder="Apellido materno" />
                            <ion-icon name="person-outline" class="icon"></ion-icon>
                        </div>
                    </div>
                    <!-- Campo para el correo -->
                    <div class="input-box">
                        <input type="email" name="correo" class="inputs input-field" placeholder="Correo electrónico"
                            required />
                        <ion-icon name="mail-outline" class="icon"></ion-icon>
                    </div>
                    <!-- Campo para la contraseña -->
                    <div class="input-box">
                        <input type="password" name="contraseña" class="inputs input-field" placeholder="Contraseña"
                            required />
                        <ion-icon name="lock-closed-outline" class="icon"></ion-icon>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" name="registro" class="btn">Registrar</button>
                    <button type="reset" class="btn">Limpiar</button>
                </div>
            </form>
        </div>
    </div>
</body>

</html>
