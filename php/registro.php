<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include 'conexion.php';

if (isset($_POST["registro"])) {
    $username = mysqli_real_escape_string($enlace, $_POST["username"]);
    $nombre = mysqli_real_escape_string($enlace, $_POST["nombre"]);
    $apellido_P = mysqli_real_escape_string($enlace, $_POST["apellido_paterno"]);
    $apellido_M = isset($_POST["apellido_materno"]) ? mysqli_real_escape_string($enlace, $_POST["apellido_materno"]) : NULL;
    $correo = mysqli_real_escape_string($enlace, $_POST["correo"]);
    $contraseña = password_hash($_POST["contraseña"], PASSWORD_BCRYPT);

    // Insertar datos en la base de datos
    $sql = "INSERT INTO usuarios (username, nombre, apellido_P, apellido_M, email, password) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $enlace->prepare($sql);
    $stmt->bind_param("ssssss", $username, $nombre, $apellido_P, $apellido_M, $correo, $contraseña);

    if ($stmt->execute()) {
        header("Location: ../menu.php");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $enlace->close();
} else {
    echo "No se recibieron datos del formulario.";
}
?>
