<?php
// Mostrar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Configuración de la base de datos
$servidor = "localhost";
$usuario = "root";
$clave = "";
$basededatos = "login";

// Crear conexión
$enlace = mysqli_connect($servidor, $usuario, $clave, $basededatos);

// Verificar conexión
if (!$enlace) {
    die("Conexión fallida: " . mysqli_connect_error());
}
?>
