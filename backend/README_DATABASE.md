# 🗄️ Base de Datos - Juguetería API

## 📋 Descripción
Sistema de base de datos MySQL con Entity Framework Core para la API de la juguetería.

## 🏗️ Estructura de la Base de Datos

### Tablas Principales

#### 1. **Categorias**
- `Id` (PK, Auto Increment)
- `Nombre` (VARCHAR 100, Required)
- `Descripcion` (VARCHAR 500)
- `ImagenUrl` (VARCHAR 200)
- `Activo` (BOOLEAN, Default: TRUE)
- `FechaCreacion` (DATETIME, Default: NOW())

#### 2. **Productos**
- `Id` (PK, Auto Increment)
- `Nombre` (VARCHAR 200, Required)
- `Descripcion` (VARCHAR 1000)
- `Precio` (DECIMAL 10,2, Required)
- `PrecioOferta` (DECIMAL 10,2)
- `ImagenUrl` (VARCHAR 200)
- `Marca` (VARCHAR 100)
- `EdadRecomendada` (VARCHAR 50)
- `Stock` (INT, Default: 0)
- `EnOferta` (BOOLEAN, Default: FALSE)
- `Activo` (BOOLEAN, Default: TRUE)
- `FechaCreacion` (DATETIME, Default: NOW())
- `CategoriaId` (FK → Categorias.Id)

#### 3. **Usuarios**
- `Id` (PK, Auto Increment)
- `Nombre` (VARCHAR 100, Required)
- `Apellido` (VARCHAR 100, Required)
- `Email` (VARCHAR 150, Required, Unique)
- `Telefono` (VARCHAR 20, Required)
- `Direccion` (VARCHAR 200)
- `Ciudad` (VARCHAR 100)
- `CodigoPostal` (VARCHAR 10)
- `Activo` (BOOLEAN, Default: TRUE)
- `FechaRegistro` (DATETIME, Default: NOW())

#### 4. **Pedidos**
- `Id` (PK, Auto Increment)
- `NumeroPedido` (VARCHAR 50, Required, Unique)
- `UsuarioId` (FK → Usuarios.Id)
- `Subtotal` (DECIMAL 10,2, Required)
- `Impuestos` (DECIMAL 10,2, Required)
- `Total` (DECIMAL 10,2, Required)
- `Estado` (VARCHAR 50, Default: 'Pendiente')
- `DireccionEnvio` (VARCHAR 200)
- `CiudadEnvio` (VARCHAR 100)
- `CodigoPostalEnvio` (VARCHAR 10)
- `Notas` (VARCHAR 500)
- `FechaPedido` (DATETIME, Default: NOW())
- `FechaEnvio` (DATETIME)
- `FechaEntrega` (DATETIME)

#### 5. **DetallesPedido**
- `Id` (PK, Auto Increment)
- `PedidoId` (FK → Pedidos.Id)
- `ProductoId` (FK → Productos.Id)
- `Cantidad` (INT, Required)
- `PrecioUnitario` (DECIMAL 10,2, Required)
- `Subtotal` (DECIMAL 10,2, Required)

## 🚀 Configuración Inicial

### 1. Crear la Base de Datos
```sql
CREATE DATABASE jugueteria_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

### 2. Configurar Connection String
En `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=jugueteria_db;User=root;Password=tu_password;CharSet=utf8mb4;"
  }
}
```

### 3. Ejecutar Migraciones
```bash
cd backend/JugueteriaAPI
dotnet ef database update
```

### 4. Insertar Datos de Ejemplo
Ejecutar el script: `database/update_productos.sql`

## 📊 Datos de Ejemplo

### Categorías Incluidas:
1. **Juguetes Educativos** - Juguetes que fomentan el aprendizaje
2. **Juguetes de Construcción** - Bloques, legos y sets de construcción
3. **Muñecas y Accesorios** - Muñecas, peluches y accesorios
4. **Juguetes Electrónicos** - Juguetes con tecnología
5. **Juegos de Mesa** - Juegos de mesa para toda la familia

### Productos Incluidos:
- **16 productos** con datos reales
- **8 productos en oferta** con precios especiales
- **4 productos destacados** para la página principal
- Imágenes de Unsplash para cada producto

## 🔧 Endpoints de la API

### Productos
- `GET /api/Productos` - Obtener todos los productos
- `GET /api/Productos/{id}` - Obtener producto por ID
- `GET /api/Productos/categoria/{categoriaId}` - Productos por categoría
- `GET /api/Productos/ofertas` - Productos en oferta
- `GET /api/Productos/buscar?termino=lego` - Buscar productos
- `GET /api/Productos/destacados` - Productos destacados
- `GET /api/Productos/edad/{edadRecomendada}` - Productos por edad
- `GET /api/Productos/marca/{marca}` - Productos por marca
- `GET /api/Productos/precio?min=1000&max=2000` - Productos por rango de precio
- `PUT /api/Productos/{id}/stock` - Actualizar stock
- `GET /api/Productos/bajo-stock?minimo=5` - Productos con bajo stock

### Estadísticas
- `GET /api/Estadisticas/generales` - Estadísticas generales
- `GET /api/Estadisticas/productos-por-categoria` - Productos por categoría
- `GET /api/Estadisticas/mas-vendidos` - Productos más vendidos
- `GET /api/Estadisticas/bajo-stock` - Productos con bajo stock
- `GET /api/Estadisticas/total-productos` - Total de productos
- `GET /api/Estadisticas/valor-inventario` - Valor total del inventario

## 🛠️ Servicios Disponibles

### ProductoService
- Gestión completa de productos (CRUD)
- Búsqueda y filtrado avanzado
- Gestión de stock
- Productos destacados y en oferta

### EstadisticasService
- Estadísticas generales del negocio
- Análisis por categorías
- Productos más vendidos
- Control de inventario

## 📈 Características Avanzadas

### Filtros Disponibles:
- **Por categoría**: Filtrar productos por tipo
- **Por edad**: Productos recomendados por edad
- **Por marca**: Productos de marcas específicas
- **Por precio**: Rango de precios
- **En oferta**: Solo productos con descuento
- **Búsqueda**: Búsqueda por nombre, descripción o marca

### Gestión de Stock:
- Control automático de inventario
- Alertas de bajo stock
- Actualización de stock en tiempo real

### Estadísticas en Tiempo Real:
- Total de productos
- Valor del inventario
- Productos por categoría
- Porcentaje de productos en oferta

## 🔍 Monitoreo y Mantenimiento

### Consultas Útiles:
```sql
-- Ver productos en oferta
SELECT * FROM Productos WHERE EnOferta = TRUE;

-- Ver productos con bajo stock
SELECT * FROM Productos WHERE Stock <= 5;

-- Valor total del inventario
SELECT SUM(Precio * Stock) as ValorTotal FROM Productos WHERE Activo = TRUE;

-- Productos por categoría
SELECT c.Nombre as Categoria, COUNT(p.Id) as Cantidad 
FROM Categorias c 
LEFT JOIN Productos p ON c.Id = p.CategoriaId 
WHERE p.Activo = TRUE 
GROUP BY c.Id, c.Nombre;
```

## 🚨 Consideraciones de Seguridad

- **Soft Delete**: Los productos se marcan como inactivos en lugar de eliminarse
- **Validaciones**: Todas las entradas se validan antes de procesarse
- **Índices**: Índices optimizados para búsquedas frecuentes
- **Transacciones**: Operaciones críticas usan transacciones de base de datos

## 📝 Notas de Desarrollo

- **Entity Framework Core**: ORM para .NET
- **MySQL**: Base de datos relacional
- **Migrations**: Control de versiones de la base de datos
- **Seed Data**: Datos de ejemplo incluidos
- **CORS**: Configurado para Angular
- **Swagger**: Documentación automática de la API 