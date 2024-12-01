<?php
include 'conexion.php'; // Conexión a la base de datos

session_start();

// Verificar que el usuario tiene una sesión activa
if (!isset($_SESSION['user_id'])) {
    die("Error: No se encontró un usuario autenticado.");
}

// Obtener el ID del usuario desde la sesión
$user_id = $_SESSION['user_id'];

// Depuración: Imprimir el ID del usuario
echo "ID del usuario: " . $user_id . "<br>";

// Obtener los datos enviados desde el formulario
$username = $_POST['username'] ?? null;
$email = $_POST['email'] ?? null;
$nombre = $_POST['nombre'] ?? null;
$apellido_P = $_POST['apellido_P'] ?? null;
$apellido_M = $_POST['apellido_M'] ?? null;
$password = $_POST['password'] ?? null;

// Depuración: Imprimir los datos recibidos
echo "Datos recibidos:<br>";
echo "Username: " . $username . "<br>";
echo "Email: " . $email . "<br>";
echo "Nombre: " . $nombre . "<br>";
echo "Apellido Paterno: " . $apellido_P . "<br>";
echo "Apellido Materno: " . $apellido_M . "<br>";
echo "Contraseña: " . ($password ? 'Recibida' : 'No recibida') . "<br>";

// Validar que todos los datos requeridos están presentes
if (!$username || !$email || !$nombre || !$apellido_P) {
    die("Error: Faltan campos obligatorios.");
}

// Conexión a la base de datos
$db = connectdb();

// Construir la consulta SQL para actualizar los datos
$sql = "UPDATE usuarios SET username = ?, email = ?, nombre = ?, apellido_P = ?, apellido_M = ?";
$params = [$username, $email, $nombre, $apellido_P, $apellido_M];

// Si se proporciona una nueva contraseña, incluirla en la actualización
if (!empty($password)) {
    $sql .= ", password = ?";
    $params[] = $password;
}

$sql .= " WHERE id = ?";
$params[] = $user_id;

try {
    // Preparar y ejecutar la consulta
    $stmt = $db->prepare($sql);

    // Depuración: Imprimir la consulta y los parámetros
    echo "Consulta preparada: " . $sql . "<br>";
    echo "Parámetros: " . json_encode($params) . "<br>";

    // Ejecutar la consulta
    $result = $stmt->execute($params);

    if ($result) {
        header("Location: ../menu.php");
    } else {
        echo "Error al actualizar los datos. Verifica la información ingresada.";
    }
} catch (Exception $e) {
    echo "Error al ejecutar la consulta: " . $e->getMessage();
}
?>
