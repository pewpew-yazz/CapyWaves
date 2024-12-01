<?php
session_start();
include 'conexion.php'; // Conexión a la base de datos

function login($username, $password)
{
    $db = connectdb(); // Conexión a la base de datos

    if (!$db) {
        die("Error al conectar con la base de datos");
    }

    // Usar parámetros preparados para evitar inyección SQL
    $stmt = $db->prepare("SELECT id, username, password, user_type FROM usuarios WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Comparar directamente la contraseña ingresada con la almacenada en la base de datos
        if ($password === $user['password']) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['user_type'] = $user['user_type'];
        
            // Imprimir mensaje de depuración
            echo "Inicio de sesión exitoso. ID del usuario: " . $_SESSION['user_id'];
        
            return true;
        }
         else {
            echo "Contraseña incorrecta.";
            return false;
        }
    } else {
        echo "Usuario no encontrado.";
        return false;
    }
}
?>
