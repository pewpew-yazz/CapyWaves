<?php
session_start();

// Incluir la conexión holaaa
include_once 'conexion.php';
function login($username, $password)
{
    // Establecer conexión a la base de datos
    $db = connectdb();
    
    // Preparar la consulta para obtener el usuario por nombre de usuario
    $stmt = $db->prepare("SELECT id, username, user_type, password FROM usuarios WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    // Verificar si el usuario existe
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Verificar la contraseña utilizando password_verify
        if (password_verify($password, $user['password'])) {
            // Si la contraseña es correcta, iniciar sesión
            $_SESSION['id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['user_type'] = $user['user_type'];
            
            // Retornar true si el login es exitoso
            return true;
        } else {
            // Contraseña incorrecta
            echo "Contraseña incorrecta.";
        }
    } else {
        // Usuario no encontrado
        echo "Usuario no encontrado.";
    }

    // Cerrar la declaración
    $stmt->close();
    
    // Retornar false si el login no es exitoso
    return false;
}
