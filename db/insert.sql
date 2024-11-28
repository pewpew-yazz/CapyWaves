-- SQLBook: Code
USE capywaves;

INSERT INTO user_types (code, name, description) VALUES
('ADMIN','Administrador','Tiene el control de todo el sitio web'),
('USER', 'Usuario', 'Puede ver lo que hay en el sitio web');

INSERT INTO usuarios (username, email, password, nombre, apellido_P, apellido_M, user_type) VALUES
('yazz', 'yazmin@gmail.com', 'ventilador', 'Yazmin', 'Ovando', 'Sanchez', 'ADMIN');