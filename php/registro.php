<?php
// Mostrar errores para depuración
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Incluir la conexión
include 'conexion.php';

if (isset($_POST["registro"])) {
    // Obtener datos del formulario
    $username = mysqli_real_escape_string($enlace, $_POST["username"]);
    $nombre = mysqli_real_escape_string($enlace, $_POST["nombre"]);
    $apellido_P = mysqli_real_escape_string($enlace, $_POST["apellido_paterno"]);
    $apellido_M = isset($_POST["apellido_materno"]) ? mysqli_real_escape_string($enlace, $_POST["apellido_materno"]) : NULL;
    $correo = mysqli_real_escape_string($enlace, $_POST["correo"]);
    $contraseña = password_hash($_POST["contraseña"], PASSWORD_BCRYPT);

    // Manejar la subida de la foto
    $photo = NULL;
    if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
        $photo_name = uniqid() . "_" . basename($_FILES["photo"]["name"]);
        $photo_path = "uploads/" . $photo_name;
        if (move_uploaded_file($_FILES["photo"]["tmp_name"], $photo_path)) {
            $photo = $photo_path;
        }
    }

    // Insertar datos en la base de datos
    $sql = "INSERT INTO usuarios (username, nombre, apellido_P, apellido_M, email, password, photo) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $enlace->prepare($sql);
    $stmt->bind_param("sssssss", $username, $nombre, $apellido_P, $apellido_M, $correo, $contraseña, $photo);

    if ($stmt->execute()) {
        header("Location: ../menu.php");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $enlace->close();
} else {
    echo "No se recibieron datos del formulario.";
}
?>
