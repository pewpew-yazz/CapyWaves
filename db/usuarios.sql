-- SQLBook: Code
--CREAR BASE DE DATOS
DROP DATABASE capywaves;
CREATE DATABASE capywaves;
USE capywaves;

/*
  id <-- llaver primaria, es autoincrementable: NO NECESITA QUE SE LE PONGA UN NUMERO

*/
DROP TABLE usuarios;
CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  email varchar(50) NOT NULL,
  password varchar(40) NOT NULL,
  nombre VARCHAR(30) NOT NULL,
  apellido_P VARCHAR(30) NOT NULL,
  apellido_M VARCHAR(30),
  photo VARCHAR(255),
  active BIT DEFAULT TRUE,
  user_type VARCHAR(5),
  CONSTRAINT fk_user_type FOREIGN KEY (user_type) REFERENCES user_types(code)
);


--NO PODIA fecha tener DEFAULT CURRENT_DATE, NO LO ACEPTABA
DROP TABLE IF EXISTS emociones;
CREATE TABLE emociones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  emocion VARCHAR(20) NOT NULL,
  fecha DATE NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT fk_user_id_emociones FOREIGN KEY (user_id) REFERENCES usuarios(id)
);

DROP TABLE IF EXISTS favoritos;
CREATE TABLE favoritos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre_favorito VARCHAR(100) NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT fk_user_id_favoritos FOREIGN KEY (user_id) REFERENCES usuarios(id)
);

/*
  1->ADMIN, 2-> NORMAL USER

  SE HIZO ASI YA QUE NO SE VAN A AGREGAR MAS TIPOS DE USUARIOS
*/
DROP TABLE user_types;
CREATE TABLE user_types (
  code VARCHAR(5) PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  description VARCHAR(50),
  active BIT DEFAULT TRUE
  );