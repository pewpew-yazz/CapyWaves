<?php

define('DB_HOST', 'localhost');
define('DB_USER', 'arturo');
define('DB_PASSWORD', '300105');
define('DB_NAME', 'capywaves');
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

function connectdb() {
    try {
        $db = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        if ($db->connect_error) {
            throw new Exception("Error al conectar: " . $db->connect_error);
        }
        return $db;
    } catch (Exception $e) {
        error_log($e->getMessage());
        return false;
    }
}

?>


