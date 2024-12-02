<?php
    include_once "conexion.php";

    function getUser($username) {
        $db = connectdb();
        $stmt = $db->prepare("SELECT * FROM usuarios WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }

    function updateUser($username, $email, $password, $name, $apellidoP, $apellidoM) {
        $db = connectdb();
        $stmt = $db->prepare("CALL updateUser(?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $username, $email, $password, $name, $apellidoP, $apellidoM);
        return $stmt->execute();
    }
    

    function getUserPhoto($username) {
        $db = connectdb();
        $stmt = $db->prepare("SELECT photo FROM usuarios WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        return $user['photo'] ?? null;
    }

    function uploadPhoto($username, $photoPath) {
        $db = connectdb();
        $stmt = $db->prepare("UPDATE usuarios SET photo = ? WHERE username = ?");
        $stmt->bind_param("ss", $photoPath, $username);
        return $stmt->execute();
    }
    
?>