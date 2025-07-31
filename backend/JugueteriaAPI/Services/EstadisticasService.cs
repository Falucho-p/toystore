using Microsoft.EntityFrameworkCore;
using JugueteriaAPI.Data;
using JugueteriaAPI.Models;

namespace JugueteriaAPI.Services
{
    public class EstadisticasService : IEstadisticasService
    {
        private readonly JugueteriaContext _context;

        public EstadisticasService(JugueteriaContext context)
        {
            _context = context;
        }

        public async Task<int> GetTotalProductosAsync()
        {
            return await _context.Productos.CountAsync(p => p.Activo);
        }

        public async Task<int> GetTotalProductosEnOfertaAsync()
        {
            return await _context.Productos.CountAsync(p => p.Activo && p.EnOferta);
        }

        public async Task<int> GetTotalCategoriasAsync()
        {
            return await _context.Categorias.CountAsync(c => c.Activo);
        }

        public async Task<decimal> GetValorTotalInventarioAsync()
        {
            return await _context.Productos
                .Where(p => p.Activo)
                .SumAsync(p => p.Precio * p.Stock);
        }

        public async Task<IEnumerable<object>> GetProductosPorCategoriaAsync()
        {
            return await _context.Productos
                .Include(p => p.Categoria)
                .Where(p => p.Activo)
                .GroupBy(p => p.Categoria.Nombre)
                .Select(g => new
                {
                    Categoria = g.Key,
                    Cantidad = g.Count(),
                    ValorTotal = g.Sum(p => p.Precio * p.Stock)
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<object>> GetProductosMasVendidosAsync()
        {
            // Por ahora retornamos productos con más stock como "más vendidos"
            // En una implementación real, esto vendría de la tabla de pedidos
            return await _context.Productos
                .Include(p => p.Categoria)
                .Where(p => p.Activo)
                .OrderByDescending(p => p.Stock)
                .Take(10)
                .Select(p => new
                {
                    p.Id,
                    p.Nombre,
                    p.Marca,
                    Categoria = p.Categoria.Nombre,
                    p.Precio,
                    p.Stock
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<object>> GetProductosBajoStockAsync(int stockMinimo = 5)
        {
            return await _context.Productos
                .Include(p => p.Categoria)
                .Where(p => p.Activo && p.Stock <= stockMinimo)
                .OrderBy(p => p.Stock)
                .Select(p => new
                {
                    p.Id,
                    p.Nombre,
                    p.Marca,
                    Categoria = p.Categoria.Nombre,
                    p.Precio,
                    p.Stock
                })
                .ToListAsync();
        }

        public async Task<object> GetEstadisticasGeneralesAsync()
        {
            var totalProductos = await GetTotalProductosAsync();
            var totalOfertas = await GetTotalProductosEnOfertaAsync();
            var totalCategorias = await GetTotalCategoriasAsync();
            var valorInventario = await GetValorTotalInventarioAsync();

            return new
            {
                TotalProductos = totalProductos,
                TotalOfertas = totalOfertas,
                TotalCategorias = totalCategorias,
                ValorInventario = valorInventario,
                PorcentajeOfertas = totalProductos > 0 ? (double)totalOfertas / totalProductos * 100 : 0,
                FechaActualizacion = DateTime.Now
            };
        }
    }
} 