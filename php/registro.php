<?php
session_start();

include_once 'conexion.php';

function registroUsuario($username, $nombre, $apellido_P, $apellido_M, $email, $password)
{
    // Establecer conexión a la base de datos
    $db = connectdb();

    // Preparar la consulta para insertar el nuevo usuario
    $stmt = $db->prepare("INSERT INTO usuarios (username, email, password, nombre, apellido_P, apellido_M) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $username, $email, $password, $nombre, $apellido_P, $apellido_M);

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
