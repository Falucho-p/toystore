using Microsoft.AspNetCore.Mvc;
using JugueteriaAPI.Models;
using JugueteriaAPI.Services;

namespace JugueteriaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriasController : ControllerBase
    {
        private readonly ICategoriaService _categoriaService;

        public CategoriasController(ICategoriaService categoriaService)
        {
            _categoriaService = categoriaService;
        }

        // GET: api/Categorias
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categoria>>> GetCategorias()
        {
            var categorias = await _categoriaService.GetAllCategoriasAsync();
            return Ok(categorias);
        }

        // GET: api/Categorias/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Categoria>> GetCategoria(int id)
        {
            var categoria = await _categoriaService.GetCategoriaByIdAsync(id);
            
            if (categoria == null)
                return NotFound();

            return Ok(categoria);
        }

        // POST: api/Categorias
        [HttpPost]
        public async Task<ActionResult<Categoria>> CreateCategoria(Categoria categoria)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdCategoria = await _categoriaService.CreateCategoriaAsync(categoria);
                return CreatedAtAction(nameof(GetCategoria), new { id = createdCategoria.Id }, createdCategoria);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al crear la categoría: {ex.Message}");
            }
        }

        // PUT: api/Categorias/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategoria(int id, Categoria categoria)
        {
            if (id != categoria.Id)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updatedCategoria = await _categoriaService.UpdateCategoriaAsync(categoria);
                return Ok(updatedCategoria);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al actualizar la categoría: {ex.Message}");
            }
        }

        // DELETE: api/Categorias/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoria(int id)
        {
            var exists = await _categoriaService.CategoriaExistsAsync(id);
            if (!exists)
                return NotFound();

            await _categoriaService.DeleteCategoriaAsync(id);
            return NoContent();
        }
    }
} 