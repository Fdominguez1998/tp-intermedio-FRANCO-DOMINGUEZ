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


CREATE DATABASE veterinaria_patitas_felices;
USE veterinaria_patitas_felices;

CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

INSERT IGNORE INTO roles (nombre) VALUES
('USER'),
('ADMIN');

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS usuario_roles (
    usuario_id INT NOT NULL,
    rol_id INT NOT NULL,
    PRIMARY KEY (usuario_id, rol_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS veterinarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    matricula VARCHAR(20) NOT NULL UNIQUE,
    especialidad VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS mascotas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    especie VARCHAR(30) NOT NULL,
    fecha_nacimiento DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS historial_clinico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mascota_id INT NOT NULL,
    veterinario_id INT NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    descripcion VARCHAR(250) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (mascota_id) REFERENCES mascotas(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

