-- Script para insertar datos adicionales en la base de datos
-- Ejecutar después de crear la base de datos

USE jugueteria_db;

-- Insertar más categorías
INSERT INTO Categorias (Nombre, Descripcion, ImagenUrl, Activo, FechaCreacion) VALUES
('Aire libre', 'Juguetes para actividades al aire libre', '/images/aire-libre.jpg', TRUE, NOW()),
('Artes', 'Materiales y juguetes de arte', '/images/artes.jpg', TRUE, NOW()),
('Manualidades y libros', 'Libros y materiales para manualidades', '/images/manualidades.jpg', TRUE, NOW()),
('Disfraces y accesorios', 'Disfraces y accesorios para niños', '/images/disfraces.jpg', TRUE, NOW()),
('Electrónica', 'Juguetes electrónicos y tecnológicos', '/images/electronica.jpg', TRUE, NOW()),
('Bebés y primera infancia', 'Juguetes para bebés y niños pequeños', '/images/bebes.jpg', TRUE, NOW()),
('Figuras de acción y muñecos', 'Figuras de acción y muñecos coleccionables', '/images/figuras.jpg', TRUE, NOW()),
('Juegos de mesa y salón', 'Juegos de mesa para toda la familia', '/images/mesa.jpg', TRUE, NOW()),
('Jugando a ser grande', 'Juguetes de rol y simulación', '/images/rol.jpg', TRUE, NOW()),
('Ladrillos y bloques', 'Bloques de construcción y LEGO', '/images/bloques.jpg', TRUE, NOW()),
('Muñecas, bebotes y ponys', 'Muñecas y juguetes de cuidado', '/images/munecas.jpg', TRUE, NOW()),
('Para la escuela', 'Útiles escolares y mochilas', '/images/escuela.jpg', TRUE, NOW()),
('Peluches', 'Peluches y juguetes blandos', '/images/peluches.jpg', TRUE, NOW()),
('Pistas y vehículos', 'Pistas de carreras y vehículos', '/images/pistas.jpg', TRUE, NOW()),
('Pistolas, espadas y lanzadardos', 'Juguetes de acción y aventura', '/images/accion.jpg', TRUE, NOW()),
('Rodados', 'Bicicletas, triciclos y monopatines', '/images/rodados.jpg', TRUE, NOW()),
('Bazar', 'Vajilla infantil y juguetes de cocina', '/images/bazar.jpg', TRUE, NOW());

-- Insertar productos adicionales (más de 100 productos)
INSERT INTO Productos (Nombre, Descripcion, Precio, PrecioOferta, ImagenUrl, Marca, EdadRecomendada, Stock, EnOferta, Activo, FechaCreacion, CategoriaId) VALUES
-- Aire libre
('Tobogán Arcoíris', 'Tobogán colorido para el jardín', 3500.00, 2800.00, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'Little Tikes', '2-8 años', 8, TRUE, TRUE, NOW(), 6),
('Columpio doble', 'Columpio para dos niños', 4200.00, NULL, 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', 'Step2', '3-10 años', 5, FALSE, TRUE, NOW(), 6),
('Piscina inflable grande', 'Piscina inflable para niños', 3900.00, 3100.00, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 'Bestway', '3-12 años', 12, TRUE, TRUE, NOW(), 6),
('Pelota de fútbol', 'Pelota oficial de fútbol', 1200.00, NULL, 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80', 'Penalty', '6+ años', 30, FALSE, TRUE, NOW(), 6),

-- Artes
('Set de acuarelas', 'Set completo de acuarelas', 800.00, 600.00, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'Crayola', '6-12 años', 25, TRUE, TRUE, NOW(), 7),
('Pinceles artísticos', 'Set de pinceles profesionales', 600.00, NULL, 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', 'Faber Castell', '8+ años', 20, FALSE, TRUE, NOW(), 7),
('Atril infantil', 'Atril para pintar', 1200.00, 950.00, 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', 'Maped', '6-12 años', 15, TRUE, TRUE, NOW(), 7),
('Set de lápices de colores', 'Set de 24 lápices de colores', 650.00, NULL, 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', 'Faber Castell', '4+ años', 40, FALSE, TRUE, NOW(), 7),

-- Manualidades y libros
('Kit de origami', 'Kit completo para hacer origami', 900.00, 700.00, 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', 'Djeco', '8+ años', 18, TRUE, TRUE, NOW(), 8),
('Set de cuentas', 'Set de cuentas para hacer pulseras', 700.00, NULL, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 'Playbox', '6+ años', 25, FALSE, TRUE, NOW(), 8),
('Cuentos clásicos', 'Libro de cuentos clásicos', 1200.00, 950.00, 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', 'Planeta', '3-8 años', 30, TRUE, TRUE, NOW(), 8),
('Libro de dinosaurios', 'Libro educativo sobre dinosaurios', 950.00, NULL, 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', 'Atlántida', '5-10 años', 22, FALSE, TRUE, NOW(), 8),

-- Disfraces y accesorios
('Disfraz de princesa', 'Disfraz completo de princesa', 2500.00, 2000.00, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'Disney', '3-8 años', 15, TRUE, TRUE, NOW(), 9),
('Disfraz de superhéroe', 'Disfraz de superhéroe con capa', 2200.00, NULL, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 'Marvel', '4-10 años', 12, FALSE, TRUE, NOW(), 9),
('Sombrero de mago', 'Sombrero de mago con varita', 800.00, 600.00, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 'Djeco', '5-12 años', 20, TRUE, TRUE, NOW(), 9),
('Corona de princesa', 'Corona brillante para princesas', 600.00, NULL, 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', 'Disney', '3-8 años', 35, FALSE, TRUE, NOW(), 9),

-- Electrónica
('Robot programable', 'Robot educativo programable', 4500.00, 3600.00, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'Clementoni', '8-14 años', 10, TRUE, TRUE, NOW(), 10),
('Tablet educativa', 'Tablet con juegos educativos', 2800.00, NULL, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 'LeapFrog', '3-8 años', 8, FALSE, TRUE, NOW(), 10),
('Piano electrónico', 'Piano electrónico para niños', 3400.00, 2700.00, 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', 'Casio', '6-12 años', 6, TRUE, TRUE, NOW(), 10),
('Microscopio digital', 'Microscopio digital educativo', 3900.00, NULL, 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', 'Clementoni', '8+ años', 4, FALSE, TRUE, NOW(), 10),

-- Bebés y primera infancia
('Sonajero musical', 'Sonajero con música y luces', 800.00, 600.00, 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', 'Fisher Price', '0-12 meses', 50, TRUE, TRUE, NOW(), 11),
('Peluche suave', 'Peluche suave para bebés', 1200.00, NULL, 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', 'Fisher Price', '0-3 años', 40, FALSE, TRUE, NOW(), 11),
('Manta de actividades', 'Manta con actividades para bebés', 1500.00, 1200.00, 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', 'Lamaze', '0-18 meses', 25, TRUE, TRUE, NOW(), 11),
('Almohada musical', 'Almohada con música relajante', 1100.00, NULL, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'VTech', '0-2 años', 30, FALSE, TRUE, NOW(), 11),

-- Figuras de acción y muñecos
('Figura de Spider-Man', 'Figura de acción de Spider-Man', 1800.00, 1400.00, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'Marvel', '4-12 años', 20, TRUE, TRUE, NOW(), 12),
('Set de animales de granja', 'Set de animales de granja', 2200.00, NULL, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 'Schleich', '3-8 años', 15, FALSE, TRUE, NOW(), 12),
('Muñeco de acción', 'Muñeco de acción articulado', 1500.00, 1200.00, 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', 'Hasbro', '4-10 años', 25, TRUE, TRUE, NOW(), 12),
('Figura de soldado', 'Figura de soldado con accesorios', 1200.00, NULL, 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', 'Playmobil', '4-12 años', 18, FALSE, TRUE, NOW(), 12),

-- Juegos de mesa y salón
('UNO', 'Juego de cartas UNO', 800.00, 600.00, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'Mattel', '7+ años', 35, TRUE, TRUE, NOW(), 13),
('Monopoly Junior', 'Monopoly para niños', 1800.00, NULL, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 'Hasbro', '5-8 años', 20, FALSE, TRUE, NOW(), 13),
('Memory cards', 'Juego de memoria con cartas', 700.00, 550.00, 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', 'Ravensburger', '4+ años', 30, TRUE, TRUE, NOW(), 13),
('Scrabble Junior', 'Scrabble para niños', 1600.00, NULL, 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', 'Hasbro', '5-8 años', 15, FALSE, TRUE, NOW(), 13),

-- Jugando a ser grande
('Cocina de juguete', 'Cocina completa de juguete', 2800.00, 2200.00, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'Little Tikes', '3-8 años', 8, TRUE, TRUE, NOW(), 14),
('Set de herramientas', 'Set de herramientas de juguete', 2200.00, NULL, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 'Black+Decker', '4-10 años', 12, FALSE, TRUE, NOW(), 14),
('Caja registradora', 'Caja registradora de juguete', 1500.00, 1200.00, 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', 'Fisher Price', '3-8 años', 20, TRUE, TRUE, NOW(), 14),
('Set de doctor', 'Set médico para niños', 1800.00, NULL, 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', 'Smoby', '4-10 años', 15, FALSE, TRUE, NOW(), 14),

-- Ladrillos y bloques
('Set LEGO Classic', 'Set básico de LEGO', 3200.00, 2500.00, 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', 'LEGO', '4+ años', 25, TRUE, TRUE, NOW(), 15),
('Mega Bloks', 'Bloques grandes para bebés', 1800.00, NULL, 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', 'Mega Bloks', '1-5 años', 30, FALSE, TRUE, NOW(), 15),
('Bloques de madera', 'Bloques de madera naturales', 1400.00, 1100.00, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'Melissa & Doug', '2-6 años', 20, TRUE, TRUE, NOW(), 15),
('Set LEGO City', 'Set de la ciudad LEGO', 2800.00, NULL, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 'LEGO', '5-12 años', 15, FALSE, TRUE, NOW(), 15),

-- Muñecas, bebotes y ponys
('Muñeca Barbie', 'Muñeca Barbie Fashionista', 2500.00, 2000.00, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 'Barbie', '3-8 años', 30, TRUE, TRUE, NOW(), 16),
('Bebote interactivo', 'Bebote que llora y come', 2800.00, NULL, 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', 'Baby Alive', '3-8 años', 18, FALSE, TRUE, NOW(), 16),
('Pony de peluche', 'Pony de peluche grande', 1600.00, 1200.00, 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', 'Hasbro', '3-8 años', 25, TRUE, TRUE, NOW(), 16),
('Set de accesorios Barbie', 'Set de ropa y accesorios', 1200.00, NULL, 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', 'Barbie', '3-8 años', 35, FALSE, TRUE, NOW(), 16),

-- Para la escuela
('Mochila escolar', 'Mochila con ruedas', 1800.00, 1400.00, 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', 'JanSport', '6-12 años', 40, TRUE, TRUE, NOW(), 17),
('Cartuchera', 'Cartuchera con útiles', 800.00, NULL, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'Maped', '6-12 años', 50, FALSE, TRUE, NOW(), 17),
('Set de útiles', 'Set completo de útiles escolares', 1200.00, 950.00, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 'Faber Castell', '6-12 años', 45, TRUE, TRUE, NOW(), 17),
('Lonchera', 'Lonchera térmica', 950.00, NULL, 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', 'Thermos', '6-12 años', 30, FALSE, TRUE, NOW(), 17),

-- Peluches
('Peluche gigante', 'Peluche gigante de oso', 2200.00, 1800.00, 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', 'Aurora', '0+ años', 15, TRUE, TRUE, NOW(), 18),
('Peluche pequeño', 'Peluche pequeño de gatito', 800.00, NULL, 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', 'Aurora', '0+ años', 40, FALSE, TRUE, NOW(), 18),
('Peluche de unicornio', 'Peluche de unicornio mágico', 950.00, 750.00, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'Aurora', '0+ años', 25, TRUE, TRUE, NOW(), 18),
('Peluche de dinosaurio', 'Peluche de dinosaurio feroz', 850.00, NULL, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 'Aurora', '0+ años', 20, FALSE, TRUE, NOW(), 18),

-- Pistas y vehículos
('Auto Hot Wheels', 'Auto de carreras Hot Wheels', 1200.00, 950.00, 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', 'Hot Wheels', '4-10 años', 50, TRUE, TRUE, NOW(), 19),
('Pista de carreras', 'Pista de carreras completa', 2800.00, NULL, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 'Hot Wheels', '4-10 años', 12, FALSE, TRUE, NOW(), 19),
('Tren eléctrico', 'Tren eléctrico con pista', 3500.00, 2800.00, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'Lionel', '6-12 años', 8, TRUE, TRUE, NOW(), 19),
('Auto de control remoto', 'Auto de control remoto', 1800.00, NULL, 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', 'Hot Wheels', '6-12 años', 15, FALSE, TRUE, NOW(), 19),

-- Pistolas, espadas y lanzadardos
('Pistola Nerf', 'Pistola de dardos Nerf', 1600.00, 1200.00, 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', 'Nerf', '8+ años', 25, TRUE, TRUE, NOW(), 20),
('Espada de juguete', 'Espada de plástico segura', 900.00, NULL, 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', 'Hasbro', '6+ años', 30, FALSE, TRUE, NOW(), 20),
('Lanzadardos', 'Lanzadardos de precisión', 1200.00, 950.00, 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', 'Nerf', '8+ años', 20, TRUE, TRUE, NOW(), 20),
('Set de espadas', 'Set de espadas de caballeros', 1500.00, NULL, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'Hasbro', '6+ años', 15, FALSE, TRUE, NOW(), 20),

-- Rodados
('Bicicleta infantil', 'Bicicleta para niños', 4500.00, 3600.00, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'Trek', '6-12 años', 10, TRUE, TRUE, NOW(), 21),
('Triciclo', 'Triciclo para niños pequeños', 2800.00, NULL, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 'Radio Flyer', '2-5 años', 8, FALSE, TRUE, NOW(), 21),
('Monopatín', 'Monopatín para niños', 3200.00, 2500.00, 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', 'Razor', '8+ años', 12, TRUE, TRUE, NOW(), 21),
('Patines', 'Patines ajustables', 1800.00, NULL, 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', 'Roller Derby', '6+ años', 15, FALSE, TRUE, NOW(), 21),

-- Bazar
('Vajilla infantil', 'Vajilla de plástico para niños', 1800.00, 1400.00, 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', 'Melissa & Doug', '2-8 años', 25, TRUE, TRUE, NOW(), 22),
('Juguetes cocina', 'Set de juguetes de cocina', 2200.00, NULL, 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', 'Little Tikes', '3-8 años', 18, FALSE, TRUE, NOW(), 22),
('Set de utensilios', 'Set de utensilios de cocina', 1600.00, 1200.00, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 'Little Tikes', '3-8 años', 20, TRUE, TRUE, NOW(), 22),
('Horno de juguete', 'Horno de juguete funcional', 2400.00, NULL, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 'Little Tikes', '3-8 años', 10, FALSE, TRUE, NOW(), 22);

-- Insertar usuarios adicionales
INSERT INTO Usuarios (Nombre, Apellido, Email, Telefono, Direccion, Ciudad, CodigoPostal, Activo, FechaRegistro) VALUES
('Ana', 'López', 'ana.lopez@email.com', '555123456', 'Calle del Sol 789', 'Valencia', '46001', TRUE, NOW()),
('Carlos', 'Martínez', 'carlos.martinez@email.com', '555987654', 'Plaza Mayor 321', 'Sevilla', '41001', TRUE, NOW()),
('Laura', 'González', 'laura.gonzalez@email.com', '555456789', 'Avenida Libertad 654', 'Bilbao', '48001', TRUE, NOW()),
('Pedro', 'Rodríguez', 'pedro.rodriguez@email.com', '555789123', 'Calle Real 987', 'Málaga', '29001', TRUE, NOW());

-- Mostrar mensaje de confirmación
SELECT 'Datos insertados exitosamente' AS Mensaje; 