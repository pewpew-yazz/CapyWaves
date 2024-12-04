<?php
include 'conexion.php';

// Punto de depuración 1: Verificar que el script se ejecuta
echo "Paso 1: Script cargado.<br>";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['registro'])) {
    echo "Paso 2: Datos recibidos.<br>";

    // Recibir datos del formulario
    $username = htmlspecialchars($_POST['username']);
    $nombre = htmlspecialchars($_POST['nombre']);
    $apellido_P = htmlspecialchars($_POST['apellido_P']);
    $apellido_M = htmlspecialchars($_POST['apellido_M']);
    $email = htmlspecialchars($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Punto de depuración 2: Mostrar los datos recibidos
    echo "Paso 3: Datos procesados:<br>";
    print_r([
        'username' => $username,
        'nombre' => $nombre,
        'apellido_P' => $apellido_P,
        'apellido_M' => $apellido_M,
        'email' => $email,
        'password' => $password,
    ]);
    echo "<br>";

    try {
        $query = "INSERT INTO usuarios (username, nombre, apellido_P, apellido_M, email, password) 
                  VALUES (:username, :nombre, :apellido_P, :apellido_M, :email, :password)";
        $stmt = $conexion->prepare($query);

        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellido_P', $apellido_P);
        $stmt->bindParam(':apellido_M', $apellido_M);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);

        if ($stmt->execute()) {
            // Redirigir al usuario a galeria.php
            header("Location: ../php/galeria.php");
            exit(); // Detener ejecución después de la redirección
        } else {
            echo "Paso 4: Error al registrar el usuario.<br>";
            print_r($stmt->errorInfo());
        }
    } catch (PDOException $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }
    exit();
}
?>
