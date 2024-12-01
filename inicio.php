
<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <title>CapyWaves discos</title>
    <script src="js/fontawesome/solid.js"></script>
    <script src="js/menu_desplegable.js"></script>
    <script src="js/inicio.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    <link href="css/inicio.css" rel="stylesheet">
</head>

<body>
    <header>
        <h1>Bienvenido, <?php echo htmlspecialchars($_SESSION['username']); ?></h1>
    </header>
    <!-- Más contenido -->
</body>

</html>
