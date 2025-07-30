using Microsoft.EntityFrameworkCore;
using JugueteriaAPI.Data;
using JugueteriaAPI.Models;

namespace JugueteriaAPI.Services
{
    public class CarritoService : ICarritoService
    {
        private readonly JugueteriaContext _context;

        public CarritoService(JugueteriaContext context)
        {
            _context = context;
        }

        public async Task<Pedido> CrearPedidoAsync(int usuarioId, List<DetallePedido> items)
        {
            // Generar número de pedido único
            var numeroPedido = $"PED-{DateTime.Now:yyyyMMdd}-{Guid.NewGuid().ToString().Substring(0, 8).ToUpper()}";
            
            // Calcular totales
            decimal subtotal = 0;
            foreach (var item in items)
            {
                var producto = await _context.Productos.FindAsync(item.ProductoId);
                if (producto != null)
                {
                    item.PrecioUnitario = producto.PrecioOferta ?? producto.Precio;
                    item.Subtotal = item.PrecioUnitario * item.Cantidad;
                    subtotal += item.Subtotal;
                }
            }
            
            decimal impuestos = subtotal * 0.21m; // 21% IVA
            decimal total = subtotal + impuestos;

            var pedido = new Pedido
            {
                NumeroPedido = numeroPedido,
                UsuarioId = usuarioId,
                Subtotal = subtotal,
                Impuestos = impuestos,
                Total = total,
                Estado = "Pendiente",
                FechaPedido = DateTime.Now,
                DetallesPedido = items
            };

            _context.Pedidos.Add(pedido);
            await _context.SaveChangesAsync();
            
            return pedido;
        }

        public async Task<Pedido?> GetPedidoByIdAsync(int id)
        {
            return await _context.Pedidos
                .Include(p => p.Usuario)
                .Include(p => p.DetallesPedido)
                    .ThenInclude(d => d.Producto)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Pedido>> GetPedidosByUsuarioAsync(int usuarioId)
        {
            return await _context.Pedidos
                .Include(p => p.DetallesPedido)
                    .ThenInclude(d => d.Producto)
                .Where(p => p.UsuarioId == usuarioId)
                .OrderByDescending(p => p.FechaPedido)
                .ToListAsync();
        }

        public async Task<Pedido> UpdatePedidoEstadoAsync(int id, string estado)
        {
            var pedido = await _context.Pedidos.FindAsync(id);
            if (pedido == null)
                throw new ArgumentException("Pedido no encontrado");

            pedido.Estado = estado;
            
            if (estado == "Enviado")
                pedido.FechaEnvio = DateTime.Now;
            else if (estado == "Entregado")
                pedido.FechaEntrega = DateTime.Now;

            await _context.SaveChangesAsync();
            return pedido;
        }

        public async Task DeletePedidoAsync(int id)
        {
            var pedido = await _context.Pedidos.FindAsync(id);
            if (pedido != null)
            {
                _context.Pedidos.Remove(pedido);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> PedidoExistsAsync(int id)
        {
            return await _context.Pedidos.AnyAsync(p => p.Id == id);
        }
    }
} 