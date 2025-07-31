using Microsoft.AspNetCore.Mvc;
using JugueteriaAPI.Services;

namespace JugueteriaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstadisticasController : ControllerBase
    {
        private readonly IEstadisticasService _estadisticasService;

        public EstadisticasController(IEstadisticasService estadisticasService)
        {
            _estadisticasService = estadisticasService;
        }

        // GET: api/Estadisticas/generales
        [HttpGet("generales")]
        public async Task<ActionResult<object>> GetEstadisticasGenerales()
        {
            try
            {
                var estadisticas = await _estadisticasService.GetEstadisticasGeneralesAsync();
                return Ok(estadisticas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        // GET: api/Estadisticas/productos-por-categoria
        [HttpGet("productos-por-categoria")]
        public async Task<ActionResult<IEnumerable<object>>> GetProductosPorCategoria()
        {
            try
            {
                var estadisticas = await _estadisticasService.GetProductosPorCategoriaAsync();
                return Ok(estadisticas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        // GET: api/Estadisticas/mas-vendidos
        [HttpGet("mas-vendidos")]
        public async Task<ActionResult<IEnumerable<object>>> GetProductosMasVendidos()
        {
            try
            {
                var productos = await _estadisticasService.GetProductosMasVendidosAsync();
                return Ok(productos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        // GET: api/Estadisticas/bajo-stock?minimo=5
        [HttpGet("bajo-stock")]
        public async Task<ActionResult<IEnumerable<object>>> GetProductosBajoStock([FromQuery] int minimo = 5)
        {
            try
            {
                var productos = await _estadisticasService.GetProductosBajoStockAsync(minimo);
                return Ok(productos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        // GET: api/Estadisticas/total-productos
        [HttpGet("total-productos")]
        public async Task<ActionResult<int>> GetTotalProductos()
        {
            try
            {
                var total = await _estadisticasService.GetTotalProductosAsync();
                return Ok(total);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        // GET: api/Estadisticas/valor-inventario
        [HttpGet("valor-inventario")]
        public async Task<ActionResult<decimal>> GetValorInventario()
        {
            try
            {
                var valor = await _estadisticasService.GetValorTotalInventarioAsync();
                return Ok(valor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }
    }
} 