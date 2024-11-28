<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Incluir la conexión
include 'conexion.php';

if (isset($_POST["login"])) {
    // Obtener datos del formulario
    $usuario = mysqli_real_escape_string($enlace, $_POST["usuario"]);
    $contraseña = $_POST["contraseña"];

    // Consulta para verificar si el usuario o correo existe
    $sql = "SELECT * FROM usuarios WHERE email = ? OR username = ?";
    $consulta = $enlace->prepare($sql);
    $consulta->bind_param("ss", $usuario, $usuario);
    $consulta->execute();
    $resultado = $consulta->get_result();

    if ($resultado->num_rows > 0) {
        // Obtener datos del usuario
        $usuarioDB = $resultado->fetch_assoc();

        // Verificar contraseña
        if (password_verify($contraseña, $usuarioDB['password'])) {
            // Iniciar sesión
            session_start();
            $_SESSION['user_id'] = $usuarioDB['id'];
            $_SESSION['username'] = $usuarioDB['username'];
            $_SESSION['nombre'] = $usuarioDB['nombre'];

            // Redirigir al menú o página principal
            header("Location: ../menu.php");
            exit();
        } else {
            echo "Contraseña incorrecta.";
        }
    } else {
        echo "Usuario o correo no encontrado.";
    }

    $consulta->close();
    mysqli_close($enlace);
} else {
    echo "No se recibieron datos del formulario.";
}
?>
