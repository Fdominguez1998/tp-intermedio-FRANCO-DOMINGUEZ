# tp-intermedio-FRANCO-DOMINGUEZ
<!-- 
CREATE DATABASE veterinaria_patitas_felices;
USE veterinaria_patitas_felices;

-- =========================
-- DUEÑOS (USUARIOS)
-- =========================
CREATE TABLE duenos (
id INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(50) NOT NULL,
apellido VARCHAR(50) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
telefono VARCHAR(20),
direccion VARCHAR(100),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- MASCOTAS (ENTIDAD PROTEGIDA)
-- =========================
CREATE TABLE mascotas (
id INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(50) NOT NULL,
especie VARCHAR(30) NOT NULL,
fecha_nacimiento DATE,
id_dueno INT NOT NULL,
FOREIGN KEY (id_dueno) REFERENCES duenos(id)
ON DELETE CASCADE
);

-- =========================
-- VETERINARIOS
-- =========================
CREATE TABLE veterinarios (
id INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(50) NOT NULL,
apellido VARCHAR(50) NOT NULL,
matricula VARCHAR(20) NOT NULL UNIQUE,
especialidad VARCHAR(50) NOT NULL
);

-- =========================
-- HISTORIAL CLÍNICO
-- =========================
CREATE TABLE historial_clinico (
id INT PRIMARY KEY AUTO_INCREMENT,
id_mascota INT NOT NULL,
id_veterinario INT NOT NULL,
fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
descripcion VARCHAR(250) NOT NULL,
FOREIGN KEY (id_mascota) REFERENCES mascotas(id)
ON DELETE CASCADE,
FOREIGN KEY (id_veterinario) REFERENCES veterinarios(id)
);

GRANT ALL PRIVILEGES ON veterinaria_patitas_felices2.\* TO 'curso_user'@'%';
FLUSH PRIVILEGES; -->



CREATE DATABASE veterinaria_patitas_felices
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE veterinaria_patitas_felices;

CREATE TABLE usuarios (
id_usuario INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
rol ENUM('USER', 'ADMIN') NOT NULL,
activo BOOLEAN DEFAULT TRUE,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE clientes (
id_cliente INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(50) NOT NULL,
apellido VARCHAR(50) NOT NULL,
telefono VARCHAR(20),
direccion VARCHAR(100),
id_usuario INT NOT NULL UNIQUE,
FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
ON DELETE CASCADE
);

CREATE TABLE veterinarios (
id_veterinario INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(50) NOT NULL,
apellido VARCHAR(50) NOT NULL,
matricula VARCHAR(30) NOT NULL UNIQUE,
especialidad VARCHAR(50),
id_usuario INT NOT NULL UNIQUE,
FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
ON DELETE CASCADE
);

CREATE TABLE mascotas (
id_mascota INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(50) NOT NULL,
especie VARCHAR(30) NOT NULL,
raza VARCHAR(50),
edad INT,
id_cliente INT NOT NULL,
FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
ON DELETE CASCADE
);

CREATE TABLE historial_clinico (
id_historial INT AUTO_INCREMENT PRIMARY KEY,
fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
descripcion TEXT NOT NULL,
tratamiento TEXT,
id_mascota INT NOT NULL,
id_veterinario INT NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (id_mascota) REFERENCES mascotas(id_mascota)
ON DELETE CASCADE,
FOREIGN KEY (id_veterinario) REFERENCES veterinarios(id_veterinario)
);


INSERT INTO usuarios (email, password, rol)
VALUES (
  'cliente1@mail.com',
  '$2b$10$hash_simulado_cliente',
  'USER'
);


INSERT INTO usuarios (email, password, rol)
VALUES (
  'vet1@mail.com',
  '$2b$10$hash_simulado_veterinario',
  'ADMIN'
);


INSERT INTO clientes (nombre, apellido, telefono, direccion, id_usuario)
VALUES (
  'Juan',
  'Pérez',
  '1122334455',
  'Av. Siempre Viva 123',
  1
);


INSERT INTO veterinarios (nombre, apellido, matricula, especialidad, id_usuario)
VALUES (
  'Ana',
  'Gómez',
  'VET-4567',
  'Clínica general',
  2
);


INSERT INTO mascotas (nombre, especie, raza, edad, id_cliente)
VALUES (
  'Firulais',
  'Perro',
  'Labrador',
  5,
  1
);


INSERT INTO historial_clinico (descripcion, tratamiento, id_mascota, id_veterinario)
VALUES (
  'Control general anual',
  'Vacuna antirrábica aplicada',
  1,
  1
);


SELECT *
FROM mascotas
WHERE id_cliente = 1;


SELECT 
  h.fecha,
  h.descripcion,
  h.tratamiento,
  v.nombre AS veterinario_nombre,
  v.apellido AS veterinario_apellido
FROM historial_clinico h
JOIN veterinarios v ON h.id_veterinario = v.id_veterinario
WHERE h.id_mascota = 1
ORDER BY h.fecha DESC;


SELECT 
  m.nombre AS mascota,
  h.fecha,
  h.descripcion,
  h.tratamiento
FROM clientes c
JOIN mascotas m ON c.id_cliente = m.id_cliente
JOIN historial_clinico h ON m.id_mascota = h.id_mascota
WHERE c.id_usuario = 1;
