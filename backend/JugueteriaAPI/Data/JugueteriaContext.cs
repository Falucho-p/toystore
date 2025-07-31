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
            // Fecha fija para todos los registros
            var fechaCreacion = new DateTime(2025, 7, 30, 21, 45, 36);
            var fechaRegistro = new DateTime(2025, 7, 30, 21, 45, 36);

            // Categorías
            modelBuilder.Entity<Categoria>().HasData(
                new Categoria { Id = 1, Nombre = "Juguetes Educativos", Descripcion = "Juguetes que fomentan el aprendizaje y desarrollo", ImagenUrl = "/images/educativos.jpg", FechaCreacion = fechaCreacion },
                new Categoria { Id = 2, Nombre = "Juguetes de Construcción", Descripcion = "Bloques, legos y sets de construcción", ImagenUrl = "/images/construccion.jpg", FechaCreacion = fechaCreacion },
                new Categoria { Id = 3, Nombre = "Muñecas y Accesorios", Descripcion = "Muñecas, peluches y accesorios", ImagenUrl = "/images/munecas.jpg", FechaCreacion = fechaCreacion },
                new Categoria { Id = 4, Nombre = "Juguetes Electrónicos", Descripcion = "Juguetes con tecnología y electrónica", ImagenUrl = "/images/electronicos.jpg", FechaCreacion = fechaCreacion },
                new Categoria { Id = 5, Nombre = "Juegos de Mesa", Descripcion = "Juegos de mesa para toda la familia", ImagenUrl = "/images/mesa.jpg", FechaCreacion = fechaCreacion }
            );

            // Productos
            modelBuilder.Entity<Producto>().HasData(
                // Productos destacados
                new Producto { Id = 1, Nombre = "Auto de Carrera", Descripcion = "Auto de carreras de alta velocidad", Precio = 1500m, ImagenUrl = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80", Marca = "Hot Wheels", EdadRecomendada = "4-8 años", Stock = 25, EnOferta = false, Activo = true, FechaCreacion = fechaCreacion, CategoriaId = 4 },
                new Producto { Id = 2, Nombre = "Muñeca", Descripcion = "Muñeca elegante con accesorios", Precio = 1200m, ImagenUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", Marca = "Barbie", EdadRecomendada = "3-8 años", Stock = 30, EnOferta = false, Activo = true, FechaCreacion = fechaCreacion, CategoriaId = 3 },
                new Producto { Id = 3, Nombre = "Bloques de Construcción", Descripcion = "Set de bloques para construir", Precio = 1800m, ImagenUrl = "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80", Marca = "Lego", EdadRecomendada = "6-12 años", Stock = 20, EnOferta = false, Activo = true, FechaCreacion = fechaCreacion, CategoriaId = 2 },
                new Producto { Id = 4, Nombre = "Peluche", Descripcion = "Peluche suave y abrazable", Precio = 950m, ImagenUrl = "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", Marca = "Fisher-Price", EdadRecomendada = "0-5 años", Stock = 40, EnOferta = false, Activo = true, FechaCreacion = fechaCreacion, CategoriaId = 3 },
                
                // Productos en oferta
                new Producto { Id = 5, Nombre = "Auto de Carrera", Descripcion = "Auto de carreras de alta velocidad", Precio = 1500m, PrecioOferta = 1200m, ImagenUrl = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80", Marca = "Hot Wheels", EdadRecomendada = "4-8 años", Stock = 25, EnOferta = true, Activo = true, FechaCreacion = fechaCreacion, CategoriaId = 4 },
                new Producto { Id = 6, Nombre = "Muñeca", Descripcion = "Muñeca elegante con accesorios", Precio = 1200m, PrecioOferta = 950m, ImagenUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", Marca = "Barbie", EdadRecomendada = "3-8 años", Stock = 30, EnOferta = true, Activo = true, FechaCreacion = fechaCreacion, CategoriaId = 3 },
                new Producto { Id = 7, Nombre = "Bloques de Construcción", Descripcion = "Set de bloques para construir", Precio = 1800m, PrecioOferta = 1450m, ImagenUrl = "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80", Marca = "Lego", EdadRecomendada = "6-12 años", Stock = 20, EnOferta = true, Activo = true, FechaCreacion = fechaCreacion, CategoriaId = 2 },
                new Producto { Id = 8, Nombre = "Peluche", Descripcion = "Peluche suave y abrazable", Precio = 950m, PrecioOferta = 700m, ImagenUrl = "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80", Marca = "Fisher-Price", EdadRecomendada = "0-5 años", Stock = 40, EnOferta = true, Activo = true, FechaCreacion = fechaCreacion, CategoriaId = 3 },
                new Producto { Id = 9, Nombre = "Puzzle 1000 Piezas", Descripcion = "Puzzle de paisaje para toda la familia", Precio = 2500m, PrecioOferta = 1800m, ImagenUrl = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80", Marca = "Ravensburger", EdadRecomendada = "8+ años", Stock = 15, EnOferta = true, Activo = true, FechaCreacion = fechaCreacion, CategoriaId = 1 },
                new Producto { Id = 10, Nombre = "Robot Programable", Descripcion = "Robot educativo para aprender programación", Precio = 3200m, PrecioOferta = 2400m, ImagenUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", Marca = "TechToys", EdadRecomendada = "8-14 años", Stock = 10, EnOferta = true, Activo = true, FechaCreacion = fechaCreacion, CategoriaId = 4 },
                new Producto { Id = 11, Nombre = "Set de Pinturas", Descripcion = "Set completo de pinturas y pinceles", Precio = 800m, PrecioOferta = 550m, ImagenUrl = "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80", Marca = "Crayola", EdadRecomendada = "6-12 años", Stock = 35, EnOferta = true, Activo = true, FechaCreacion = fechaCreacion, CategoriaId = 1 },
                new Producto { Id = 12, Nombre = "Juego de Mesa", Descripcion = "Juego de mesa para toda la familia", Precio = 1800m, PrecioOferta = 1300m, ImagenUrl = "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80", Marca = "Hasbro", EdadRecomendada = "6+ años", Stock = 20, EnOferta = true, Activo = true, FechaCreacion = fechaCreacion, CategoriaId = 5 },
                
                // Productos adicionales por categoría
                new Producto { Id = 13, Nombre = "Tobogán Arcoíris", Descripcion = "Tobogán colorido para el jardín", Precio = 3500m, ImagenUrl = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80", Marca = "Little Tikes", EdadRecomendada = "2-8 años", Stock = 8, EnOferta = false, Activo = true, FechaCreacion = fechaCreacion, CategoriaId = 2 },
                new Producto { Id = 14, Nombre = "Columpio doble", Descripcion = "Columpio para dos niños", Precio = 4200m, ImagenUrl = "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80", Marca = "Step2", EdadRecomendada = "3-10 años", Stock = 5, EnOferta = false, Activo = true, FechaCreacion = fechaCreacion, CategoriaId = 2 },
                new Producto { Id = 15, Nombre = "Pelota de fútbol", Descripcion = "Pelota oficial de fútbol", Precio = 1200m, ImagenUrl = "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80", Marca = "Penalty", EdadRecomendada = "6+ años", Stock = 30, EnOferta = false, Activo = true, FechaCreacion = fechaCreacion, CategoriaId = 4 },
                new Producto { Id = 16, Nombre = "Set de acuarelas", Descripcion = "Set completo de acuarelas", Precio = 800m, ImagenUrl = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80", Marca = "Crayola", EdadRecomendada = "6-12 años", Stock = 25, EnOferta = false, Activo = true, FechaCreacion = fechaCreacion, CategoriaId = 1 }
            );

            // Usuarios de ejemplo
            modelBuilder.Entity<Usuario>().HasData(
                new Usuario { Id = 1, Nombre = "Juan", Apellido = "Pérez", Email = "juan.perez@email.com", Telefono = "123456789", Direccion = "Calle Principal 123", Ciudad = "Madrid", CodigoPostal = "28001", FechaRegistro = fechaRegistro },
                new Usuario { Id = 2, Nombre = "María", Apellido = "García", Email = "maria.garcia@email.com", Telefono = "987654321", Direccion = "Avenida Central 456", Ciudad = "Barcelona", CodigoPostal = "08001", FechaRegistro = fechaRegistro }
            );
        }
    }
} 