<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'conexiones.php/conexion.php'; // Ajusta la ruta
session_start();

$msg = ''; // Mensaje de error o éxito

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    echo "Paso 1: Datos enviados por el formulario.<br>";

    $usuario = htmlspecialchars($_POST['usuario']);
    $contraseña = htmlspecialchars($_POST['contraseña']);

    try {
        echo "Paso 2: Iniciando consulta a la base de datos.<br>";

        // Consulta para verificar credenciales
        $query = "SELECT * FROM usuarios WHERE username = :usuario";
        $stmt = $conexion->prepare($query); // Asegúrate de que $conexion esté definida
        $stmt->bindParam(':usuario', $usuario);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo "Paso 3: Usuario encontrado.<br>";

            if (password_verify($contraseña, $user['password'])) {
                echo "Paso 4: Contraseña correcta.<br>";

                // Credenciales correctas, iniciar sesión
                $_SESSION['username'] = $user['username'];
                header('Location: php/galeria.php'); // Redirige al perfil del usuario
                exit();
            } else {
                echo "Paso 4: Contraseña incorrecta.<br>";
                $msg = 'Contraseña incorrecta.';
            }
        } else {
            echo "Paso 3: Usuario no encontrado.<br>";
            $msg = 'Usuario no encontrado.';
        }
    } catch (PDOException $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }
}
?>



<!DOCTYPE html>
<html lang="es">

<head>
    <!-- Title -->
    <title>CapyWaves - Log In</title>

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
    <link href="css/headerlogo.css" rel="stylesheet" />
    <link href="css/login.css" rel="stylesheet" />
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/colors.css" rel="stylesheet" />

    <!-- Metadata -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Jersey+10&display=swap" rel="stylesheet">
</head>

<body>
<header class="header">
    <div class="header-left">
        <a href="menu.php">
            <img src="fotos/logo1.gif" id="logo">
        </a>
    </div>
</header>

    <div class="form-container">
        <div class="form-col">
            <!-- Botones para alternar entre formularios -->
            <div class="btn-box">
                <button class="btn btn-1" id="login">Iniciar sesión</button>
                <button class="btn btn-2" id="register">Registrarse</button>
            </div>

            <!-- Login Form (Iniciar sesión) -->
            <form class="form-box login-form" id="login-seccion" method="post" action="" autocomplete="off">
    <div class="form-title">
        <span>Inicia sesión</span>
    </div>

    <?php if (!empty($msg)) { ?>
        <div class="form-error" id="msg"><?php echo htmlspecialchars($msg); ?></div>
    <?php } ?>

    <div class="form-inputs">
        <!-- Campo para el usuario -->
        <div class="input-box">
            <input type="text" name="usuario" class="inputs input-field" placeholder="Usuario" required />
            <ion-icon name="person-outline" class="icon"></ion-icon>
        </div>
        <!-- Campo para la contraseña -->
        <div class="input-box">
            <input type="password" name="contraseña" id="logPassword" class="inputs input-field"
                placeholder="Contraseña" required />
            <ion-icon name="lock-closed-outline" class="icon" id="log-password-icon"></ion-icon>
        </div>
        <!-- Botón para enviar -->
        <div class="input-box">
            <button type="submit" name="login" class="inputs submit-btn">
                <span>Iniciar sesión</span>
                <ion-icon name="arrow-forward-outline"></ion-icon>
            </button>
        </div>
    </div>
</form>


            <!-- Register Form (Registrarse) -->
            <form id="register-section" class="form-box register-form" method="post" action="conexiones.php/registro.php" autocomplete="off">
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
                <input type="text" name="apellido_P" class="inputs input-field"
                    placeholder="Apellido paterno" required />
                <ion-icon name="person-outline" class="icon"></ion-icon>
            </div>
            <div class="input-box">
                <input type="text" name="apellido_M" class="inputs input-field"
                    placeholder="Apellido materno" />
                <ion-icon name="person-outline" class="icon"></ion-icon>
            </div>
        </div>
        <!-- Campo para el correo -->
        <div class="input-box">
            <input type="email" name="email" class="inputs input-field" placeholder="Correo electrónico"
                required />
            <ion-icon name="mail-outline" class="icon"></ion-icon>
        </div>
        <!-- Campo para la contraseña -->
        <div class="input-box">
            <input type="password" name="password" class="inputs input-field" placeholder="Contraseña"
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
