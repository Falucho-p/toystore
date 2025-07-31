-- Script para actualizar los productos en la base de datos
-- Ejecutar este script después de crear la base de datos inicial

USE jugueteria_db;

-- Limpiar productos existentes
DELETE FROM Productos;

-- Resetear el auto increment
ALTER TABLE Productos AUTO_INCREMENT = 1;

-- Insertar productos destacados
INSERT INTO Productos (Id, Nombre, Descripcion, Precio, PrecioOferta, ImagenUrl, Marca, EdadRecomendada, Stock, EnOferta, Activo, FechaCreacion, CategoriaId) VALUES
(1, 'Auto de Carrera', 'Auto de carreras de alta velocidad', 1500.00, NULL, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'Hot Wheels', '4-8 años', 25, FALSE, TRUE, NOW(), 4),
(2, 'Muñeca', 'Muñeca elegante con accesorios', 1200.00, NULL, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 'Barbie', '3-8 años', 30, FALSE, TRUE, NOW(), 3),
(3, 'Bloques de Construcción', 'Set de bloques para construir', 1800.00, NULL, 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', 'Lego', '6-12 años', 20, FALSE, TRUE, NOW(), 2),
(4, 'Peluche', 'Peluche suave y abrazable', 950.00, NULL, 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', 'Fisher-Price', '0-5 años', 40, FALSE, TRUE, NOW(), 3);

-- Insertar productos en oferta
INSERT INTO Productos (Id, Nombre, Descripcion, Precio, PrecioOferta, ImagenUrl, Marca, EdadRecomendada, Stock, EnOferta, Activo, FechaCreacion, CategoriaId) VALUES
(5, 'Auto de Carrera', 'Auto de carreras de alta velocidad', 1500.00, 1200.00, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'Hot Wheels', '4-8 años', 25, TRUE, TRUE, NOW(), 4),
(6, 'Muñeca', 'Muñeca elegante con accesorios', 1200.00, 950.00, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 'Barbie', '3-8 años', 30, TRUE, TRUE, NOW(), 3),
(7, 'Bloques de Construcción', 'Set de bloques para construir', 1800.00, 1450.00, 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', 'Lego', '6-12 años', 20, TRUE, TRUE, NOW(), 2),
(8, 'Peluche', 'Peluche suave y abrazable', 950.00, 700.00, 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', 'Fisher-Price', '0-5 años', 40, TRUE, TRUE, NOW(), 3),
(9, 'Puzzle 1000 Piezas', 'Puzzle de paisaje para toda la familia', 2500.00, 1800.00, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'Ravensburger', '8+ años', 15, TRUE, TRUE, NOW(), 1),
(10, 'Robot Programable', 'Robot educativo para aprender programación', 3200.00, 2400.00, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 'TechToys', '8-14 años', 10, TRUE, TRUE, NOW(), 4),
(11, 'Set de Pinturas', 'Set completo de pinturas y pinceles', 800.00, 550.00, 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', 'Crayola', '6-12 años', 35, TRUE, TRUE, NOW(), 1),
(12, 'Juego de Mesa', 'Juego de mesa para toda la familia', 1800.00, 1300.00, 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', 'Hasbro', '6+ años', 20, TRUE, TRUE, NOW(), 5);

-- Insertar productos adicionales por categoría
INSERT INTO Productos (Id, Nombre, Descripcion, Precio, PrecioOferta, ImagenUrl, Marca, EdadRecomendada, Stock, EnOferta, Activo, FechaCreacion, CategoriaId) VALUES
(13, 'Tobogán Arcoíris', 'Tobogán colorido para el jardín', 3500.00, NULL, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'Little Tikes', '2-8 años', 8, FALSE, TRUE, NOW(), 2),
(14, 'Columpio doble', 'Columpio para dos niños', 4200.00, NULL, 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', 'Step2', '3-10 años', 5, FALSE, TRUE, NOW(), 2),
(15, 'Pelota de fútbol', 'Pelota oficial de fútbol', 1200.00, NULL, 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80', 'Penalty', '6+ años', 30, FALSE, TRUE, NOW(), 4),
(16, 'Set de acuarelas', 'Set completo de acuarelas', 800.00, NULL, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'Crayola', '6-12 años', 25, FALSE, TRUE, NOW(), 1);

-- Verificar que se insertaron correctamente
SELECT COUNT(*) as TotalProductos FROM Productos;
SELECT COUNT(*) as ProductosEnOferta FROM Productos WHERE EnOferta = TRUE;
SELECT COUNT(*) as ProductosDestacados FROM Productos WHERE Id <= 4; 