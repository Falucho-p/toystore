# Backend Juguetería API

Backend desarrollado en .NET 8 Web API con Entity Framework Core y MySQL para la aplicación de juguetería.

## 🚀 Tecnologías Utilizadas

- **.NET 8** - Framework de desarrollo
- **Entity Framework Core** - ORM para acceso a datos
- **MySQL** - Base de datos
- **Pomelo.EntityFrameworkCore.MySql** - Proveedor MySQL para EF Core
- **Swagger/OpenAPI** - Documentación de API

## 📋 Prerrequisitos

- .NET 8 SDK
- MySQL Server
- Visual Studio 2022 o VS Code

## 🛠️ Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd backend/JugueteriaAPI
```

### 2. Configurar la base de datos

#### Opción A: Usando el script SQL
1. Abrir MySQL Workbench o cualquier cliente MySQL
2. Ejecutar el script `../database/jugueteria_db.sql`
3. Verificar que la base de datos `jugueteria_db` se creó correctamente

#### Opción B: Usando Entity Framework Migrations
```bash
# Crear la migración inicial
dotnet ef migrations add InitialCreate

# Aplicar la migración a la base de datos
dotnet ef database update
```

### 3. Configurar la cadena de conexión

Editar `appsettings.json` y modificar la cadena de conexión según tu configuración de MySQL:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=jugueteria_db;User=root;Password=tu_password;"
  }
}
```

### 4. Restaurar dependencias
```bash
dotnet restore
```

### 5. Ejecutar la aplicación
```bash
dotnet run
```

La API estará disponible en:
- **URL**: https://localhost:7001 o http://localhost:5001
- **Swagger**: https://localhost:7001/swagger

## 📚 Endpoints de la API

### Productos
- `GET /api/Productos` - Obtener todos los productos
- `GET /api/Productos/{id}` - Obtener producto por ID
- `GET /api/Productos/categoria/{categoriaId}` - Productos por categoría
- `GET /api/Productos/ofertas` - Productos en oferta
- `GET /api/Productos/buscar?termino=lego` - Buscar productos
- `POST /api/Productos` - Crear nuevo producto
- `PUT /api/Productos/{id}` - Actualizar producto
- `DELETE /api/Productos/{id}` - Eliminar producto

### Categorías
- `GET /api/Categorias` - Obtener todas las categorías
- `GET /api/Categorias/{id}` - Obtener categoría por ID
- `POST /api/Categorias` - Crear nueva categoría
- `PUT /api/Categorias/{id}` - Actualizar categoría
- `DELETE /api/Categorias/{id}` - Eliminar categoría

### Carrito/Pedidos
- `POST /api/Carrito/crear-pedido` - Crear nuevo pedido
- `GET /api/Carrito/pedido/{id}` - Obtener pedido por ID
- `GET /api/Carrito/pedidos-usuario/{usuarioId}` - Pedidos por usuario
- `PUT /api/Carrito/pedido/{id}/estado` - Actualizar estado del pedido
- `DELETE /api/Carrito/pedido/{id}` - Eliminar pedido

## 🗄️ Estructura de la Base de Datos

### Tablas Principales

#### Categorias
- `Id` (PK)
- `Nombre`
- `Descripcion`
- `ImagenUrl`
- `Activo`
- `FechaCreacion`

#### Productos
- `Id` (PK)
- `Nombre`
- `Descripcion`
- `Precio`
- `PrecioOferta`
- `ImagenUrl`
- `Marca`
- `EdadRecomendada`
- `Stock`
- `EnOferta`
- `Activo`
- `FechaCreacion`
- `CategoriaId` (FK)

#### Usuarios
- `Id` (PK)
- `Nombre`
- `Apellido`
- `Email` (Unique)
- `Telefono`
- `Direccion`
- `Ciudad`
- `CodigoPostal`
- `Activo`
- `FechaRegistro`

#### Pedidos
- `Id` (PK)
- `NumeroPedido` (Unique)
- `UsuarioId` (FK)
- `Subtotal`
- `Impuestos`
- `Total`
- `Estado`
- `DireccionEnvio`
- `CiudadEnvio`
- `CodigoPostalEnvio`
- `Notas`
- `FechaPedido`
- `FechaEnvio`
- `FechaEntrega`

#### DetallesPedido
- `Id` (PK)
- `PedidoId` (FK)
- `ProductoId` (FK)
- `Cantidad`
- `PrecioUnitario`
- `Subtotal`

## 🔧 Configuración de CORS

La API está configurada para permitir peticiones desde Angular en:
- `http://localhost:4200`
- `https://localhost:4200`

## 📝 Ejemplos de Uso

### Crear un pedido
```json
POST /api/Carrito/crear-pedido
{
  "usuarioId": 1,
  "items": [
    {
      "productoId": 1,
      "cantidad": 2
    },
    {
      "productoId": 3,
      "cantidad": 1
    }
  ]
}
```

### Buscar productos
```
GET /api/Productos/buscar?termino=lego
```

### Actualizar estado de pedido
```json
PUT /api/Carrito/pedido/1/estado
{
  "estado": "Enviado"
}
```

## 🚀 Despliegue

### Para producción
1. Configurar la cadena de conexión de producción
2. Ejecutar `dotnet publish -c Release`
3. Desplegar los archivos generados en el servidor

### Variables de entorno
```bash
# Cadena de conexión de producción
ConnectionStrings__DefaultConnection="Server=prod-server;Database=jugueteria_db;User=prod_user;Password=prod_password;"
```

## 🐛 Solución de Problemas

### Error de conexión a MySQL
- Verificar que MySQL esté ejecutándose
- Comprobar la cadena de conexión
- Verificar credenciales de usuario

### Error de migración
```bash
# Eliminar migraciones existentes
dotnet ef migrations remove

# Crear nueva migración
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## 📞 Soporte

Para reportar problemas o solicitar nuevas funcionalidades, crear un issue en el repositorio.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. 