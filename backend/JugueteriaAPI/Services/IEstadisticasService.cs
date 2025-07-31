using JugueteriaAPI.Models;

namespace JugueteriaAPI.Services
{
    public interface IEstadisticasService
    {
        Task<int> GetTotalProductosAsync();
        Task<int> GetTotalProductosEnOfertaAsync();
        Task<int> GetTotalCategoriasAsync();
        Task<decimal> GetValorTotalInventarioAsync();
        Task<IEnumerable<object>> GetProductosPorCategoriaAsync();
        Task<IEnumerable<object>> GetProductosMasVendidosAsync();
        Task<IEnumerable<object>> GetProductosBajoStockAsync(int stockMinimo = 5);
        Task<object> GetEstadisticasGeneralesAsync();
    }
} 