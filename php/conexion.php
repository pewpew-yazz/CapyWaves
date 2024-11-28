<?php
// Mostrar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Configuración de la base de datos
$servidor = 'localhost';
$usuario = 'yaz';
$clave = 'ventilador';
$basededatos = 'capywaves'; // Asegúrate de que coincide con tu base de datos


function connectdb()
{
    try {
        $db = mysqli_connect($servidor, $usuario, $clave, $basededatos);
        return $db;
    } catch (Exception $e) {
        error_log($e->getMessage());
        return false;
    }
}
?>
