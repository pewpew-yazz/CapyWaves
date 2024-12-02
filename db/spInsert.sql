-- SQLBook: Code
USE capywaves;

DROP PROCEDURE addUser;

DELIMITER;
CREATE PROCEDURE addUser(
    IN u_username VARCHAR(50),
    IN u_email VARCHAR(50),
    IN u_password VARCHAR(40),
    IN u_name VARCHAR(30),
    IN u_apellidoP VARCHAR(30),
    IN u_apellidoM VARCHAR(30)
)
BEGIN
    INSERT INTO usuarios (username, email, password, nombre, apellido_P, apellido_M, user_type) VALUES 
    (u_username, u_email, u_password, u_name, u_apellidoP, u_apellidoM, 'USER');
END;

CALL addUser('Art', 'art@gmail.com', 'salsa', 'Arturo', 'Herrera', 'Luevano');


--ACTUALIZA AL USUARIO MEDIANTE EL USERNAME YA QUE ES UNICO
DELIMITER;
CREATE PROCEDURE updateUser(
    IN u_username VARCHAR(50),
    IN u_email VARCHAR(50),
    IN u_password VARCHAR(40),
    IN u_name VARCHAR(30),
    IN u_apellidoP VARCHAR(30),
    IN u_apellidoM VARCHAR(30)
)
BEGIN
    UPDATE usuarios SET
    username = u_username,
    email = u_email,
    password = u_password,
    nombre = u_name,
    apellido_P = u_apellidoP,
    apellido_M = u_apellidoM
    WHERE username = u_username;
END;

CALL updateUser('Art', 'art@gmail.com', '123', 'Jesus', 'Herrera', 'Luevano');