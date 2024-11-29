<?php
// Mostrar errores para depuración
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

// Configuración de la base de datos
$servidor = 'localhost';
$usuario = 'yaz';
$clave = 'ventilador';
$basededatos = 'capywaves'; // Asegúrate de que coincide con tu base de datos


/*function connectdb()
{
    try {
        echo ("ANTES DE LA CONEXION");
        $db = mysqli_connect($servidor, $usuario, $clave, $basededatos);
       echo ("DESPUES DE LA CONEXION");
        return $db;
    } catch (Exception $e) {
        error_log($e->getMessage());
        return false;
    }
}*/

function connectdb()
{
    // Definir las variables de conexión
    $servidor = "localhost"; // Cambiar por tu host si es diferente
    $usuario = "yaz";       // Cambiar por tu usuario
    $clave = "ventilador";             // Cambiar por tu contraseña
    $basededatos = "capywaves"; // Cambiar por tu base de datos

    try {
        echo ("ANTES DE LA CONEXION\n");
        
        // Crear la conexión usando PDO
        $dsn = "mysql:host=$servidor;dbname=$basededatos;charset=utf8mb4";
        $db = new PDO($dsn, $usuario, $clave);
        
        // Configurar PDO para que lance excepciones en caso de error
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        echo ("DESPUES DE LA CONEXION\n");
        return $db;
    } catch (PDOException $e) {
        error_log($e->getMessage()); // Registrar el error en el log
        echo "Error: " . $e->getMessage(); // Mostrar un mensaje de error (opcional)
        return false;
    }
}
?>


