<?php
// Mostrar errores para depuración
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Incluir la conexión
include 'conexion.php';

if (isset($_POST["registro"])) {
    // Obtener datos del formulario y escapar caracteres peligrosos
    $nombre = mysqli_real_escape_string($enlace, $_POST["nombre"]);
    $apellido_P = mysqli_real_escape_string($enlace, $_POST["apellido_P"]);
    $apellido_M = isset($_POST["apellido_M"]) ? mysqli_real_escape_string($enlace, $_POST["apellido_M"]) : NULL;
    $username = mysqli_real_escape_string($enlace, $_POST["username"]);
    $correo = mysqli_real_escape_string($enlace, $_POST["correo"]);
    $contraseña = password_hash($_POST["contraseña"], PASSWORD_BCRYPT); // Encriptar contraseña

    // Manejar la subida de la foto
    $photo = NULL;
    if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
        $photo_name = uniqid() . "_" . basename($_FILES["photo"]["name"]);
        $photo_path = "uploads/" . $photo_name;
        if (move_uploaded_file($_FILES["photo"]["tmp_name"], $photo_path)) {
            $photo = $photo_path; // Guardamos la ruta de la foto
        }
    }

    // Consulta SQL para insertar datos en la tabla usuarios
    $sql = "INSERT INTO usuarios (nombre, apellido_P, apellido_M, username, email, password, photo) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $insertar = $enlace->prepare($sql);
    $insertar->bind_param("sssssss", $nombre, $apellido_P, $apellido_M, $username, $correo, $contraseña, $photo);

    // Ejecutar la consulta
    if ($insertar->execute()) {
        // Redirigir al menú o página principal después del registro
        header("Location: ../menu.php");
        exit(); // Asegurar que el script se detenga después de la redirección
    } else {
        echo "Error al registrar: " . $enlace->error;
    }

    // Cerrar la consulta y la conexión
    $insertar->close();
    mysqli_close($enlace);
} else {
    echo "No se recibieron datos del formulario.";
}
?>
