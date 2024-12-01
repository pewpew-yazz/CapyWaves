<?php
session_start();

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
