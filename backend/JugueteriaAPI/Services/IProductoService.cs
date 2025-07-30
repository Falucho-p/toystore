using JugueteriaAPI.Models;

namespace JugueteriaAPI.Services
{
    public interface IProductoService
    {
        Task<IEnumerable<Producto>> GetAllProductosAsync();
        Task<Producto?> GetProductoByIdAsync(int id);
        Task<IEnumerable<Producto>> GetProductosByCategoriaAsync(int categoriaId);
        Task<IEnumerable<Producto>> GetProductosEnOfertaAsync();
        Task<IEnumerable<Producto>> SearchProductosAsync(string searchTerm);
        Task<Producto> CreateProductoAsync(Producto producto);
        Task<Producto> UpdateProductoAsync(Producto producto);
        Task DeleteProductoAsync(int id);
        Task<bool> ProductoExistsAsync(int id);
    }
} 