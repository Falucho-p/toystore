using Microsoft.EntityFrameworkCore;
using JugueteriaAPI.Models;

namespace JugueteriaAPI.Data
{
    public class JugueteriaContext : DbContext
    {
        public JugueteriaContext(DbContextOptions<JugueteriaContext> options) : base(options)
        {
        }

        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<DetallePedido> DetallesPedido { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuración de Categoria
            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nombre).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Descripcion).HasMaxLength(500);
                entity.Property(e => e.ImagenUrl).HasMaxLength(200);
                // FechaCreacion se maneja automáticamente en C#
            });

            // Configuración de Producto
            modelBuilder.Entity<Producto>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nombre).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Descripcion).HasMaxLength(1000);
                entity.Property(e => e.Precio).HasColumnType("decimal(10,2)");
                entity.Property(e => e.PrecioOferta).HasColumnType("decimal(10,2)");
                entity.Property(e => e.ImagenUrl).HasMaxLength(200);
                entity.Property(e => e.Marca).HasMaxLength(100);
                entity.Property(e => e.EdadRecomendada).HasMaxLength(50);
                // FechaCreacion se maneja automáticamente en C#
                
                // Relación con Categoria
                entity.HasOne(e => e.Categoria)
                      .WithMany(e => e.Productos)
                      .HasForeignKey(e => e.CategoriaId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Configuración de Usuario
            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nombre).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Apellido).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(150);
                entity.Property(e => e.Telefono).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Direccion).HasMaxLength(200);
                entity.Property(e => e.Ciudad).HasMaxLength(100);
                entity.Property(e => e.CodigoPostal).HasMaxLength(10);
                // FechaRegistro se maneja automáticamente en C#
                
                // Índice único para email
                entity.HasIndex(e => e.Email).IsUnique();
            });

            // Configuración de Pedido
            modelBuilder.Entity<Pedido>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.NumeroPedido).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Subtotal).HasColumnType("decimal(10,2)");
                entity.Property(e => e.Impuestos).HasColumnType("decimal(10,2)");
                entity.Property(e => e.Total).HasColumnType("decimal(10,2)");
                entity.Property(e => e.Estado).HasMaxLength(50);
                entity.Property(e => e.DireccionEnvio).HasMaxLength(200);
                entity.Property(e => e.CiudadEnvio).HasMaxLength(100);
                entity.Property(e => e.CodigoPostalEnvio).HasMaxLength(10);
                entity.Property(e => e.Notas).HasMaxLength(500);
                // FechaPedido se maneja automáticamente en C#
                
                // Relación con Usuario
                entity.HasOne(e => e.Usuario)
                      .WithMany(e => e.Pedidos)
                      .HasForeignKey(e => e.UsuarioId)
                      .OnDelete(DeleteBehavior.Restrict);
                
                // Índice único para número de pedido
                entity.HasIndex(e => e.NumeroPedido).IsUnique();
            });

            // Configuración de DetallePedido
            modelBuilder.Entity<DetallePedido>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Cantidad).IsRequired();
                entity.Property(e => e.PrecioUnitario).HasColumnType("decimal(10,2)");
                entity.Property(e => e.Subtotal).HasColumnType("decimal(10,2)");
                
                // Relación con Pedido
                entity.HasOne(e => e.Pedido)
                      .WithMany(e => e.DetallesPedido)
                      .HasForeignKey(e => e.PedidoId)
                      .OnDelete(DeleteBehavior.Cascade);
                
                // Relación con Producto
                entity.HasOne(e => e.Producto)
                      .WithMany(e => e.DetallesPedido)
                      .HasForeignKey(e => e.ProductoId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Datos de ejemplo
            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            // Categorías
            modelBuilder.Entity<Categoria>().HasData(
                new Categoria { Id = 1, Nombre = "Juguetes Educativos", Descripcion = "Juguetes que fomentan el aprendizaje y desarrollo", ImagenUrl = "/images/educativos.jpg" },
                new Categoria { Id = 2, Nombre = "Juguetes de Construcción", Descripcion = "Bloques, legos y sets de construcción", ImagenUrl = "/images/construccion.jpg" },
                new Categoria { Id = 3, Nombre = "Muñecas y Accesorios", Descripcion = "Muñecas, peluches y accesorios", ImagenUrl = "/images/munecas.jpg" },
                new Categoria { Id = 4, Nombre = "Juguetes Electrónicos", Descripcion = "Juguetes con tecnología y electrónica", ImagenUrl = "/images/electronicos.jpg" },
                new Categoria { Id = 5, Nombre = "Juegos de Mesa", Descripcion = "Juegos de mesa para toda la familia", ImagenUrl = "/images/mesa.jpg" }
            );

            // Productos
            modelBuilder.Entity<Producto>().HasData(
                new Producto { Id = 1, Nombre = "Set de Bloques Educativos", Descripcion = "Bloques de colores para aprender formas y colores", Precio = 29.99m, PrecioOferta = 24.99m, ImagenUrl = "/images/bloques.jpg", Marca = "EducaKids", EdadRecomendada = "3-6 años", Stock = 50, EnOferta = true, CategoriaId = 1 },
                new Producto { Id = 2, Nombre = "Lego City Policía", Descripcion = "Set de construcción de la ciudad policial", Precio = 45.99m, ImagenUrl = "/images/lego-policia.jpg", Marca = "LEGO", EdadRecomendada = "6-12 años", Stock = 30, CategoriaId = 2 },
                new Producto { Id = 3, Nombre = "Muñeca Barbie Fashionista", Descripcion = "Muñeca Barbie con vestidos elegantes", Precio = 19.99m, PrecioOferta = 15.99m, ImagenUrl = "/images/barbie.jpg", Marca = "Mattel", EdadRecomendada = "3-8 años", Stock = 25, EnOferta = true, CategoriaId = 3 },
                new Producto { Id = 4, Nombre = "Robot Programable", Descripcion = "Robot educativo para aprender programación", Precio = 89.99m, ImagenUrl = "/images/robot.jpg", Marca = "TechToys", EdadRecomendada = "8-14 años", Stock = 15, CategoriaId = 4 },
                new Producto { Id = 5, Nombre = "Monopoly Junior", Descripcion = "Versión infantil del clásico juego de mesa", Precio = 24.99m, ImagenUrl = "/images/monopoly.jpg", Marca = "Hasbro", EdadRecomendada = "5-8 años", Stock = 40, CategoriaId = 5 },
                new Producto { Id = 6, Nombre = "Puzzle 1000 Piezas", Descripcion = "Puzzle de paisaje para toda la familia", Precio = 34.99m, PrecioOferta = 29.99m, ImagenUrl = "/images/puzzle.jpg", Marca = "Ravensburger", EdadRecomendada = "8+ años", Stock = 20, EnOferta = true, CategoriaId = 1 },
                new Producto { Id = 7, Nombre = "Set de Pinturas", Descripcion = "Set completo de pinturas y pinceles", Precio = 39.99m, ImagenUrl = "/images/pinturas.jpg", Marca = "ArtCraft", EdadRecomendada = "6-12 años", Stock = 35, CategoriaId = 1 },
                new Producto { Id = 8, Nombre = "Carrera de Coches", Descripcion = "Pista de carreras con coches de control remoto", Precio = 59.99m, PrecioOferta = 49.99m, ImagenUrl = "/images/carrera.jpg", Marca = "HotWheels", EdadRecomendada = "4-10 años", Stock = 18, EnOferta = true, CategoriaId = 4 }
            );

            // Usuarios de ejemplo
            modelBuilder.Entity<Usuario>().HasData(
                new Usuario { Id = 1, Nombre = "Juan", Apellido = "Pérez", Email = "juan.perez@email.com", Telefono = "123456789", Direccion = "Calle Principal 123", Ciudad = "Madrid", CodigoPostal = "28001" },
                new Usuario { Id = 2, Nombre = "María", Apellido = "García", Email = "maria.garcia@email.com", Telefono = "987654321", Direccion = "Avenida Central 456", Ciudad = "Barcelona", CodigoPostal = "08001" }
            );
        }
    }
} 