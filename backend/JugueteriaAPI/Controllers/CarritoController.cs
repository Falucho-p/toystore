using Microsoft.AspNetCore.Mvc;
using JugueteriaAPI.Models;
using JugueteriaAPI.Services;

namespace JugueteriaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarritoController : ControllerBase
    {
        private readonly ICarritoService _carritoService;

        public CarritoController(ICarritoService carritoService)
        {
            _carritoService = carritoService;
        }

        // POST: api/Carrito/crear-pedido
        [HttpPost("crear-pedido")]
        public async Task<ActionResult<Pedido>> CrearPedido([FromBody] CrearPedidoRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (request.Items == null || !request.Items.Any())
                return BadRequest("El pedido debe contener al menos un producto");

            try
            {
                var pedido = await _carritoService.CrearPedidoAsync(request.UsuarioId, request.Items);
                return CreatedAtAction(nameof(GetPedido), new { id = pedido.Id }, pedido);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al crear el pedido: {ex.Message}");
            }
        }

        // GET: api/Carrito/pedido/5
        [HttpGet("pedido/{id}")]
        public async Task<ActionResult<Pedido>> GetPedido(int id)
        {
            var pedido = await _carritoService.GetPedidoByIdAsync(id);
            
            if (pedido == null)
                return NotFound();

            return Ok(pedido);
        }

        // GET: api/Carrito/pedidos-usuario/5
        [HttpGet("pedidos-usuario/{usuarioId}")]
        public async Task<ActionResult<IEnumerable<Pedido>>> GetPedidosByUsuario(int usuarioId)
        {
            var pedidos = await _carritoService.GetPedidosByUsuarioAsync(usuarioId);
            return Ok(pedidos);
        }

        // PUT: api/Carrito/pedido/5/estado
        [HttpPut("pedido/{id}/estado")]
        public async Task<ActionResult<Pedido>> UpdatePedidoEstado(int id, [FromBody] UpdateEstadoRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Estado))
                return BadRequest("El estado es requerido");

            try
            {
                var pedido = await _carritoService.UpdatePedidoEstadoAsync(id, request.Estado);
                return Ok(pedido);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al actualizar el estado: {ex.Message}");
            }
        }

        // DELETE: api/Carrito/pedido/5
        [HttpDelete("pedido/{id}")]
        public async Task<IActionResult> DeletePedido(int id)
        {
            var exists = await _carritoService.PedidoExistsAsync(id);
            if (!exists)
                return NotFound();

            await _carritoService.DeletePedidoAsync(id);
            return NoContent();
        }
    }

    // DTOs para las requests
    public class CrearPedidoRequest
    {
        public int UsuarioId { get; set; }
        public List<DetallePedido> Items { get; set; } = new List<DetallePedido>();
    }

    public class UpdateEstadoRequest
    {
        public string Estado { get; set; } = string.Empty;
    }
} 