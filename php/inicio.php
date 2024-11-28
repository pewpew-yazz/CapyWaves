<?php

// Mostrar errores para depuración
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Incluir la conexión
include 'conexion.php';

echo "Conexión incluida correctamente.<br>";

if (isset($_POST["login"])) {
    echo "Datos del formulario recibidos.<br>";

    // Obtener datos del formulario
    $correo = mysqli_real_escape_string($enlace, $_POST["correo"]);
    $contraseña = $_POST["contraseña"];

    // Consulta SQL para buscar el usuario
    $consulta = $enlace->prepare("SELECT id, nombre, contraseña FROM usuarios WHERE correo = ?");
    if ($consulta === false) {
        die("Error en la preparación de la consulta: " . $enlace->error);
    }

    $consulta->bind_param("s", $correo);
    $consulta->execute();
    $resultado = $consulta->get_result();

    echo "Consulta ejecutada.<br>";

    if ($resultado->num_rows > 0) {
        // Usuario encontrado, verificar contraseña
        echo "Usuario encontrado.<br>";
        $usuario = $resultado->fetch_assoc();

        if (password_verify($contraseña, $usuario["contraseña"])) {
            // Inicio de sesión exitoso
            echo "Contraseña verificada.<br>";
            session_start();
            $_SESSION["usuario_id"] = $usuario["id"];
            $_SESSION["usuario_nombre"] = $usuario["nombre"];
            header("Location: ../menu.php");
            exit();
        } else {
            // Contraseña incorrecta
            die("Contraseña incorrecta.");
        }
    } else {
        // Usuario no encontrado
        die("Usuario no encontrado.");
    }

    $consulta->close();
} else {
    die("Acceso no permitido.");
}

?>
