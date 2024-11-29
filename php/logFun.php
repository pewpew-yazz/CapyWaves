<?php
session_start();

// Incluir la conexión holaaa
include_once 'conexion.php';
function login($username, $password)
{
    $db = connectdb();
    
    $stmt = $db->prepare("SELECT id, username, user_type, password FROM usuarios WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        if ($password === $user['password']) {
            $_SESSION['id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['user_type'] = $user['user_type'];

            return true;
        }
    }
    $stmt->close();
    return false;
}

function logout() {
    // Iniciar la sesión (si no está ya iniciada)
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    $_SESSION = [];

    session_destroy();
    
    header("Location: login.php");
    exit();
}
?>
