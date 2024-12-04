<?php
include_once 'conexion.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $usuario = htmlspecialchars($_POST['usuario']);
    $contraseña = htmlspecialchars($_POST['contraseña']);

    // Consulta para verificar credenciales
    $query = "SELECT * FROM usuarios WHERE username = :usuario";
    $stmt = $conexion->prepare($query);
    $stmt->bindParam(':usuario', $usuario);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($contraseña, $user['password'])) {
        // Credenciales correctas, iniciar sesión
        $_SESSION['username'] = $user['username'];
        header('Location: php/edit_profile.php');
        exit();
    } else {
        // Credenciales incorrectas
        $msg = 'Usuario o contraseña incorrectos.';
    }
}
?>
