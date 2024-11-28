<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include_once 'conexion.php';

function registroUsuario($username, $nombre, $apellido_P, $apellido_M, $correo, $contraseña)
{
    // Establecer conexión a la base de datos
    $db = connectdb();

    // Preparar la consulta para insertar el nuevo usuario
    $stmt = $db->prepare("INSERT INTO usuarios (username, nombre, apellido_P, apellido_M, email, password) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $username, $nombre, $apellido_P, $apellido_M, $correo, $contraseña);

    // Ejecutar la consulta y verificar si fue exitosa
    if ($stmt->execute()) {
        header("Location: ../discos.php");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $db->close();
}
?>
