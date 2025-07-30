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
    }
} 