using JugueteriaAPI.Models;

namespace JugueteriaAPI.Services
{
    public interface ICarritoService
    {
        Task<Pedido> CrearPedidoAsync(int usuarioId, List<DetallePedido> items);
        Task<Pedido?> GetPedidoByIdAsync(int id);
        Task<IEnumerable<Pedido>> GetPedidosByUsuarioAsync(int usuarioId);
        Task<Pedido> UpdatePedidoEstadoAsync(int id, string estado);
        Task DeletePedidoAsync(int id);
        Task<bool> PedidoExistsAsync(int id);
    }
} 