using Microsoft.EntityFrameworkCore;
using JugueteriaAPI.Data;
using JugueteriaAPI.Models;

namespace JugueteriaAPI.Services
{
    public class ProductoService : IProductoService
    {
        private readonly JugueteriaContext _context;

        public ProductoService(JugueteriaContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Producto>> GetAllProductosAsync()
        {
            return await _context.Productos
                .Include(p => p.Categoria)
                .Where(p => p.Activo)
                .OrderBy(p => p.Nombre)
                .ToListAsync();
        }

        public async Task<Producto?> GetProductoByIdAsync(int id)
        {
            return await _context.Productos
                .Include(p => p.Categoria)
                .FirstOrDefaultAsync(p => p.Id == id && p.Activo);
        }

        public async Task<IEnumerable<Producto>> GetProductosByCategoriaAsync(int categoriaId)
        {
            return await _context.Productos
                .Include(p => p.Categoria)
                .Where(p => p.CategoriaId == categoriaId && p.Activo)
                .OrderBy(p => p.Nombre)
                .ToListAsync();
        }

        public async Task<IEnumerable<Producto>> GetProductosEnOfertaAsync()
        {
            return await _context.Productos
                .Include(p => p.Categoria)
                .Where(p => p.EnOferta && p.Activo)
                .OrderBy(p => p.PrecioOferta)
                .ToListAsync();
        }

        public async Task<IEnumerable<Producto>> SearchProductosAsync(string searchTerm)
        {
            var term = searchTerm.ToLower();
            return await _context.Productos
                .Include(p => p.Categoria)
                .Where(p => p.Activo && 
                           (p.Nombre.ToLower().Contains(term) || 
                            p.Descripcion!.ToLower().Contains(term) || 
                            p.Marca!.ToLower().Contains(term)))
                .OrderBy(p => p.Nombre)
                .ToListAsync();
        }

        public async Task<Producto> CreateProductoAsync(Producto producto)
        {
            producto.FechaCreacion = DateTime.Now;
            producto.Activo = true;
            
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();
            return producto;
        }

        public async Task<Producto> UpdateProductoAsync(Producto producto)
        {
            var existingProducto = await _context.Productos.FindAsync(producto.Id);
            if (existingProducto == null)
                throw new ArgumentException("Producto no encontrado");

            existingProducto.Nombre = producto.Nombre;
            existingProducto.Descripcion = producto.Descripcion;
            existingProducto.Precio = producto.Precio;
            existingProducto.PrecioOferta = producto.PrecioOferta;
            existingProducto.ImagenUrl = producto.ImagenUrl;
            existingProducto.Marca = producto.Marca;
            existingProducto.EdadRecomendada = producto.EdadRecomendada;
            existingProducto.Stock = producto.Stock;
            existingProducto.EnOferta = producto.EnOferta;
            existingProducto.CategoriaId = producto.CategoriaId;

            await _context.SaveChangesAsync();
            return existingProducto;
        }

        public async Task DeleteProductoAsync(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto != null)
            {
                producto.Activo = false;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ProductoExistsAsync(int id)
        {
            return await _context.Productos.AnyAsync(p => p.Id == id && p.Activo);
        }

        public async Task<IEnumerable<Producto>> GetProductosDestacadosAsync()
        {
            return await _context.Productos
                .Include(p => p.Categoria)
                .Where(p => p.Activo && p.Stock > 0)
                .OrderByDescending(p => p.FechaCreacion)
                .Take(4)
                .ToListAsync();
        }

        public async Task<IEnumerable<Producto>> GetProductosPorEdadAsync(string edadRecomendada)
        {
            return await _context.Productos
                .Include(p => p.Categoria)
                .Where(p => p.Activo && p.EdadRecomendada!.Contains(edadRecomendada))
                .OrderBy(p => p.Precio)
                .ToListAsync();
        }

        public async Task<IEnumerable<Producto>> GetProductosPorMarcaAsync(string marca)
        {
            return await _context.Productos
                .Include(p => p.Categoria)
                .Where(p => p.Activo && p.Marca!.ToLower().Contains(marca.ToLower()))
                .OrderBy(p => p.Nombre)
                .ToListAsync();
        }

        public async Task<IEnumerable<Producto>> GetProductosPorPrecioAsync(decimal precioMin, decimal precioMax)
        {
            return await _context.Productos
                .Include(p => p.Categoria)
                .Where(p => p.Activo && p.Precio >= precioMin && p.Precio <= precioMax)
                .OrderBy(p => p.Precio)
                .ToListAsync();
        }

        public async Task UpdateStockAsync(int productoId, int cantidad)
        {
            var producto = await _context.Productos.FindAsync(productoId);
            if (producto != null)
            {
                producto.Stock = Math.Max(0, producto.Stock - cantidad);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Producto>> GetProductosBajoStockAsync(int stockMinimo = 5)
        {
            return await _context.Productos
                .Include(p => p.Categoria)
                .Where(p => p.Activo && p.Stock <= stockMinimo)
                .OrderBy(p => p.Stock)
                .ToListAsync();
        }
    }
} 