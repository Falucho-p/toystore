using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace JugueteriaAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Categorias",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nombre = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Descripcion = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ImagenUrl = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Activo = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categorias", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nombre = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Apellido = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Telefono = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Direccion = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Ciudad = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CodigoPostal = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Activo = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    FechaRegistro = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Productos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nombre = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Descripcion = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Precio = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    PrecioOferta = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    ImagenUrl = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Marca = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EdadRecomendada = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Stock = table.Column<int>(type: "int", nullable: false),
                    EnOferta = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Activo = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CategoriaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Productos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Productos_Categorias_CategoriaId",
                        column: x => x.CategoriaId,
                        principalTable: "Categorias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Pedidos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    NumeroPedido = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UsuarioId = table.Column<int>(type: "int", nullable: false),
                    Subtotal = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Impuestos = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Estado = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DireccionEnvio = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CiudadEnvio = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CodigoPostalEnvio = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Notas = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FechaPedido = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    FechaEnvio = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    FechaEntrega = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pedidos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pedidos_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DetallesPedido",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PedidoId = table.Column<int>(type: "int", nullable: false),
                    ProductoId = table.Column<int>(type: "int", nullable: false),
                    Cantidad = table.Column<int>(type: "int", nullable: false),
                    PrecioUnitario = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Subtotal = table.Column<decimal>(type: "decimal(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetallesPedido", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetallesPedido_Pedidos_PedidoId",
                        column: x => x.PedidoId,
                        principalTable: "Pedidos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetallesPedido_Productos_ProductoId",
                        column: x => x.ProductoId,
                        principalTable: "Productos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Categorias",
                columns: new[] { "Id", "Activo", "Descripcion", "FechaCreacion", "ImagenUrl", "Nombre" },
                values: new object[,]
                {
                    { 1, true, "Juguetes que fomentan el aprendizaje y desarrollo", new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "/images/educativos.jpg", "Juguetes Educativos" },
                    { 2, true, "Bloques, legos y sets de construcción", new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "/images/construccion.jpg", "Juguetes de Construcción" },
                    { 3, true, "Muñecas, peluches y accesorios", new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "/images/munecas.jpg", "Muñecas y Accesorios" },
                    { 4, true, "Juguetes con tecnología y electrónica", new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "/images/electronicos.jpg", "Juguetes Electrónicos" },
                    { 5, true, "Juegos de mesa para toda la familia", new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "/images/mesa.jpg", "Juegos de Mesa" }
                });

            migrationBuilder.InsertData(
                table: "Usuarios",
                columns: new[] { "Id", "Activo", "Apellido", "Ciudad", "CodigoPostal", "Direccion", "Email", "FechaRegistro", "Nombre", "Telefono" },
                values: new object[,]
                {
                    { 1, true, "Pérez", "Madrid", "28001", "Calle Principal 123", "juan.perez@email.com", new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "Juan", "123456789" },
                    { 2, true, "García", "Barcelona", "08001", "Avenida Central 456", "maria.garcia@email.com", new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "María", "987654321" }
                });

            migrationBuilder.InsertData(
                table: "Productos",
                columns: new[] { "Id", "Activo", "CategoriaId", "Descripcion", "EdadRecomendada", "EnOferta", "FechaCreacion", "ImagenUrl", "Marca", "Nombre", "Precio", "PrecioOferta", "Stock" },
                values: new object[,]
                {
                    { 1, true, 4, "Auto de carreras de alta velocidad", "4-8 años", false, new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80", "Hot Wheels", "Auto de Carrera", 1500m, null, 25 },
                    { 2, true, 3, "Muñeca elegante con accesorios", "3-8 años", false, new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", "Barbie", "Muñeca", 1200m, null, 30 },
                    { 3, true, 2, "Set de bloques para construir", "6-12 años", false, new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80", "Lego", "Bloques de Construcción", 1800m, null, 20 },
                    { 4, true, 3, "Peluche suave y abrazable", "0-5 años", false, new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", "Fisher-Price", "Peluche", 950m, null, 40 },
                    { 5, true, 4, "Auto de carreras de alta velocidad", "4-8 años", true, new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80", "Hot Wheels", "Auto de Carrera", 1500m, 1200m, 25 },
                    { 6, true, 3, "Muñeca elegante con accesorios", "3-8 años", true, new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", "Barbie", "Muñeca", 1200m, 950m, 30 },
                    { 7, true, 2, "Set de bloques para construir", "6-12 años", true, new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80", "Lego", "Bloques de Construcción", 1800m, 1450m, 20 },
                    { 8, true, 3, "Peluche suave y abrazable", "0-5 años", true, new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80", "Fisher-Price", "Peluche", 950m, 700m, 40 },
                    { 9, true, 1, "Puzzle de paisaje para toda la familia", "8+ años", true, new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80", "Ravensburger", "Puzzle 1000 Piezas", 2500m, 1800m, 15 },
                    { 10, true, 4, "Robot educativo para aprender programación", "8-14 años", true, new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", "TechToys", "Robot Programable", 3200m, 2400m, 10 },
                    { 11, true, 1, "Set completo de pinturas y pinceles", "6-12 años", true, new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80", "Crayola", "Set de Pinturas", 800m, 550m, 35 },
                    { 12, true, 5, "Juego de mesa para toda la familia", "6+ años", true, new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80", "Hasbro", "Juego de Mesa", 1800m, 1300m, 20 },
                    { 13, true, 2, "Tobogán colorido para el jardín", "2-8 años", false, new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80", "Little Tikes", "Tobogán Arcoíris", 3500m, null, 8 },
                    { 14, true, 2, "Columpio para dos niños", "3-10 años", false, new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80", "Step2", "Columpio doble", 4200m, null, 5 },
                    { 15, true, 4, "Pelota oficial de fútbol", "6+ años", false, new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80", "Penalty", "Pelota de fútbol", 1200m, null, 30 },
                    { 16, true, 1, "Set completo de acuarelas", "6-12 años", false, new DateTime(2025, 7, 30, 21, 45, 36, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80", "Crayola", "Set de acuarelas", 800m, null, 25 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_DetallesPedido_PedidoId",
                table: "DetallesPedido",
                column: "PedidoId");

            migrationBuilder.CreateIndex(
                name: "IX_DetallesPedido_ProductoId",
                table: "DetallesPedido",
                column: "ProductoId");

            migrationBuilder.CreateIndex(
                name: "IX_Pedidos_NumeroPedido",
                table: "Pedidos",
                column: "NumeroPedido",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pedidos_UsuarioId",
                table: "Pedidos",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Productos_CategoriaId",
                table: "Productos",
                column: "CategoriaId");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_Email",
                table: "Usuarios",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetallesPedido");

            migrationBuilder.DropTable(
                name: "Pedidos");

            migrationBuilder.DropTable(
                name: "Productos");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "Categorias");
        }
    }
}
