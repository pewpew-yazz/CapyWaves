<?php
session_start();

// Incluir la conexión
include 'conexion.php';

if (isset($_POST["login"])) {
    $username = mysqli_real_escape_string($enlace, $_POST["usuario"]);
    $contraseña = $_POST["contraseña"];

    $sql = "SELECT * FROM usuarios WHERE username = ?";
    $stmt = $enlace->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();
        if (password_verify($contraseña, $usuario['password'])) {
            $_SESSION['username'] = $usuario['username'];
            header("Location: ../menu.php");
            exit();
        } else {
            echo "Contraseña incorrecta.";
        }
    } else {
        echo "Usuario no encontrado.";
    }

    $stmt->close();
} else {
    echo "No se recibieron datos del formulario.";
}

$enlace->close();
?>
