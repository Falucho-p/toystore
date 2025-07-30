using Microsoft.AspNetCore.Mvc;
using JugueteriaAPI.Models;
using JugueteriaAPI.Services;

namespace JugueteriaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        private readonly IProductoService _productoService;

        public ProductosController(IProductoService productoService)
        {
            _productoService = productoService;
        }

        // GET: api/Productos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
        {
            var productos = await _productoService.GetAllProductosAsync();
            return Ok(productos);
        }

        // GET: api/Productos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> GetProducto(int id)
        {
            var producto = await _productoService.GetProductoByIdAsync(id);
            
            if (producto == null)
                return NotFound();

            return Ok(producto);
        }

        // GET: api/Productos/categoria/5
        [HttpGet("categoria/{categoriaId}")]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductosByCategoria(int categoriaId)
        {
            var productos = await _productoService.GetProductosByCategoriaAsync(categoriaId);
            return Ok(productos);
        }

        // GET: api/Productos/ofertas
        [HttpGet("ofertas")]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductosEnOferta()
        {
            var productos = await _productoService.GetProductosEnOfertaAsync();
            return Ok(productos);
        }

        // GET: api/Productos/buscar?termino=lego
        [HttpGet("buscar")]
        public async Task<ActionResult<IEnumerable<Producto>>> SearchProductos([FromQuery] string termino)
        {
            if (string.IsNullOrWhiteSpace(termino))
                return BadRequest("El término de búsqueda es requerido");

            var productos = await _productoService.SearchProductosAsync(termino);
            return Ok(productos);
        }

        // POST: api/Productos
        [HttpPost]
        public async Task<ActionResult<Producto>> CreateProducto(Producto producto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdProducto = await _productoService.CreateProductoAsync(producto);
                return CreatedAtAction(nameof(GetProducto), new { id = createdProducto.Id }, createdProducto);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al crear el producto: {ex.Message}");
            }
        }

        // PUT: api/Productos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProducto(int id, Producto producto)
        {
            if (id != producto.Id)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updatedProducto = await _productoService.UpdateProductoAsync(producto);
                return Ok(updatedProducto);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al actualizar el producto: {ex.Message}");
            }
        }

        // DELETE: api/Productos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducto(int id)
        {
            var exists = await _productoService.ProductoExistsAsync(id);
            if (!exists)
                return NotFound();

            await _productoService.DeleteProductoAsync(id);
            return NoContent();
        }
    }
} 