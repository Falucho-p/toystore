-- Script para crear la base de datos de la Juguetería
-- Ejecutar este script en MySQL para crear la base de datos y las tablas

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS jugueteria_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE jugueteria_db;

-- Crear tabla Categorias
CREATE TABLE IF NOT EXISTS Categorias (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(500) NULL,
    ImagenUrl VARCHAR(200) NULL,
    Activo BOOLEAN NOT NULL DEFAULT TRUE,
    FechaCreacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla Productos
CREATE TABLE IF NOT EXISTS Productos (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(200) NOT NULL,
    Descripcion VARCHAR(1000) NULL,
    Precio DECIMAL(10,2) NOT NULL,
    PrecioOferta DECIMAL(10,2) NULL,
    ImagenUrl VARCHAR(200) NULL,
    Marca VARCHAR(100) NULL,
    EdadRecomendada VARCHAR(50) NULL,
    Stock INT NOT NULL DEFAULT 0,
    EnOferta BOOLEAN NOT NULL DEFAULT FALSE,
    Activo BOOLEAN NOT NULL DEFAULT TRUE,
    FechaCreacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CategoriaId INT NOT NULL,
    FOREIGN KEY (CategoriaId) REFERENCES Categorias(Id) ON DELETE RESTRICT
);

-- Crear tabla Usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Apellido VARCHAR(100) NOT NULL,
    Email VARCHAR(150) NOT NULL UNIQUE,
    Telefono VARCHAR(20) NOT NULL,
    Direccion VARCHAR(200) NULL,
    Ciudad VARCHAR(100) NULL,
    CodigoPostal VARCHAR(10) NULL,
    Activo BOOLEAN NOT NULL DEFAULT TRUE,
    FechaRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla Pedidos
CREATE TABLE IF NOT EXISTS Pedidos (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    NumeroPedido VARCHAR(50) NOT NULL UNIQUE,
    UsuarioId INT NOT NULL,
    Subtotal DECIMAL(10,2) NOT NULL,
    Impuestos DECIMAL(10,2) NOT NULL,
    Total DECIMAL(10,2) NOT NULL,
    Estado VARCHAR(50) NOT NULL DEFAULT 'Pendiente',
    DireccionEnvio VARCHAR(200) NULL,
    CiudadEnvio VARCHAR(100) NULL,
    CodigoPostalEnvio VARCHAR(10) NULL,
    Notas VARCHAR(500) NULL,
    FechaPedido DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FechaEnvio DATETIME NULL,
    FechaEntrega DATETIME NULL,
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id) ON DELETE RESTRICT
);

-- Crear tabla DetallesPedido
CREATE TABLE IF NOT EXISTS DetallesPedido (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    PedidoId INT NOT NULL,
    ProductoId INT NOT NULL,
    Cantidad INT NOT NULL,
    PrecioUnitario DECIMAL(10,2) NOT NULL,
    Subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (PedidoId) REFERENCES Pedidos(Id) ON DELETE CASCADE,
    FOREIGN KEY (ProductoId) REFERENCES Productos(Id) ON DELETE RESTRICT
);

-- Insertar datos de ejemplo para Categorias
INSERT INTO Categorias (Id, Nombre, Descripcion, ImagenUrl) VALUES
(1, 'Juguetes Educativos', 'Juguetes que fomentan el aprendizaje y desarrollo', '/images/educativos.jpg'),
(2, 'Juguetes de Construcción', 'Bloques, legos y sets de construcción', '/images/construccion.jpg'),
(3, 'Muñecas y Accesorios', 'Muñecas, peluches y accesorios', '/images/munecas.jpg'),
(4, 'Juguetes Electrónicos', 'Juguetes con tecnología y electrónica', '/images/electronicos.jpg'),
(5, 'Juegos de Mesa', 'Juegos de mesa para toda la familia', '/images/mesa.jpg');

-- Insertar datos de ejemplo para Productos
INSERT INTO Productos (Id, Nombre, Descripcion, Precio, PrecioOferta, ImagenUrl, Marca, EdadRecomendada, Stock, EnOferta, CategoriaId) VALUES
(1, 'Set de Bloques Educativos', 'Bloques de colores para aprender formas y colores', 29.99, 24.99, '/images/bloques.jpg', 'EducaKids', '3-6 años', 50, TRUE, 1),
(2, 'Lego City Policía', 'Set de construcción de la ciudad policial', 45.99, NULL, '/images/lego-policia.jpg', 'LEGO', '6-12 años', 30, FALSE, 2),
(3, 'Muñeca Barbie Fashionista', 'Muñeca Barbie con vestidos elegantes', 19.99, 15.99, '/images/barbie.jpg', 'Mattel', '3-8 años', 25, TRUE, 3),
(4, 'Robot Programable', 'Robot educativo para aprender programación', 89.99, NULL, '/images/robot.jpg', 'TechToys', '8-14 años', 15, FALSE, 4),
(5, 'Monopoly Junior', 'Versión infantil del clásico juego de mesa', 24.99, NULL, '/images/monopoly.jpg', 'Hasbro', '5-8 años', 40, FALSE, 5),
(6, 'Puzzle 1000 Piezas', 'Puzzle de paisaje para toda la familia', 34.99, 29.99, '/images/puzzle.jpg', 'Ravensburger', '8+ años', 20, TRUE, 1),
(7, 'Set de Pinturas', 'Set completo de pinturas y pinceles', 39.99, NULL, '/images/pinturas.jpg', 'ArtCraft', '6-12 años', 35, FALSE, 1),
(8, 'Carrera de Coches', 'Pista de carreras con coches de control remoto', 59.99, 49.99, '/images/carrera.jpg', 'HotWheels', '4-10 años', 18, TRUE, 4);

-- Insertar datos de ejemplo para Usuarios
INSERT INTO Usuarios (Id, Nombre, Apellido, Email, Telefono, Direccion, Ciudad, CodigoPostal) VALUES
(1, 'Juan', 'Pérez', 'juan.perez@email.com', '123456789', 'Calle Principal 123', 'Madrid', '28001'),
(2, 'María', 'García', 'maria.garcia@email.com', '987654321', 'Avenida Central 456', 'Barcelona', '08001');

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_productos_categoria ON Productos(CategoriaId);
CREATE INDEX idx_productos_activo ON Productos(Activo);
CREATE INDEX idx_productos_oferta ON Productos(EnOferta);
CREATE INDEX idx_pedidos_usuario ON Pedidos(UsuarioId);
CREATE INDEX idx_pedidos_estado ON Pedidos(Estado);
CREATE INDEX idx_detalles_pedido ON DetallesPedido(PedidoId);
CREATE INDEX idx_detalles_producto ON DetallesPedido(ProductoId);

-- Mostrar mensaje de confirmación
SELECT 'Base de datos jugueteria_db creada exitosamente' AS Mensaje; 