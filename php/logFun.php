<?php
session_start();

include_once 'conexion.php';

function login($username, $password)
{
    $db = connectdb();

    if (!$db) {
        die("Error al conectar con la base de datos");
    }

    $stmt = $db->prepare("SELECT id, username, password, user_type FROM usuarios WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        if ($password === $user['password']) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['user_type'] = $user['user_type'];
        
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
    $stmt->close();
    return false;
}


//AQUI ESTA CERRAR SESION :D
function logout() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    $_SESSION = [];

    session_destroy();
    
    header("Location: login.php");
    exit();
}
?>
