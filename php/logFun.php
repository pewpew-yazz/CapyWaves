<?php
session_start();

// Incluir la conexión holaaa
include_once 'conexion.php';

function login($username, $password)
{
    $db = connectdb(); // Conexión a la base de datos

    if (!$db) {
        die("Error al conectar con la base de datos");
    }

    $sql = "SELECT id, username, user_type, password FROM usuarios WHERE username = '$username'";
    $result = $db->query($sql);

    if (!$result) {
        die("Error en la consulta SQL: " . $db->error);
    }

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        if ($password === $user['password']) {
            $_SESSION['id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['user_type'] = $user['user_type'];
            return true;
        }
    }

    return false;
}



function logout() {
    // Iniciar la sesión (si no está ya iniciada)
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    $_SESSION = [];

    session_destroy();
    
    header("Location: ../login.php");
    exit();
}
?>
