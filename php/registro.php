<?php
include_once 'conexion.php';

function registroUsuario($username, $correo, $contraseña, $nombre, $apellido_P, $apellido_M)
{
    // Establecer conexión a la base de datos
    $db = connectdb();
    if (!$db) {
        echo "Error al conectar con la base de datos.";
        return false;
    }

    // Preparar la consulta para llamar al procedimiento almacenado
    $query = "CALL addUser(?, ?, ?, ?, ?, ?)";
    $stmt = $db->prepare($query);

    if (!$stmt) {
        echo "Error al preparar la consulta: " . $db->error;
        return false;
    }

    // Vincular los parámetros
    $stmt->bind_param("ssssss", $username, $correo, $contraseña, $nombre, $apellido_P, $apellido_M);

    // Ejecutar la consulta y verificar si fue exitosa
    if ($stmt->execute()) {
        $stmt->close();
        $db->close();
        return true;
    } else {
        echo "Error: " . $stmt->error;
        $stmt->close();
        $db->close();
        return false;
    }
}
?>
