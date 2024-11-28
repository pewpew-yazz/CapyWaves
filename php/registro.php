<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

// Incluir la conexión
include 'conexion.php';

if (isset($_POST["registro"])) {
    // Obtener datos del formulario
    $nombre = mysqli_real_escape_string($enlace, $_POST["nombre"]);
    $correo = mysqli_real_escape_string($enlace, $_POST["correo"]);
    $contraseña = password_hash($_POST["contraseña"], PASSWORD_BCRYPT);

    // Consulta SQL para insertar los datos (usando consulta preparada)
    $insertarDatos = $enlace->prepare("INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)");
    $insertarDatos->bind_param("sss", $nombre, $correo, $contraseña);

    // Ejecutar la consulta
    if ($insertarDatos->execute()) {
        // Redirige correctamente a la página deseada
        header("Location: ../menu.php");  // Ajusta la ruta según tu estructura de carpetas
        exit();  // Asegura que la ejecución del script se detenga después de la redirección
    }
    
    // Cerrar la conexión
    $insertarDatos->close();
    mysqli_close($enlace);
} else {
    echo "No se recibieron datos del formulario.";
}
?>
