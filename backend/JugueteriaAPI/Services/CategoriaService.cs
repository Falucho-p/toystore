using Microsoft.EntityFrameworkCore;
using JugueteriaAPI.Data;
using JugueteriaAPI.Models;

namespace JugueteriaAPI.Services
{
    public class CategoriaService : ICategoriaService
    {
        private readonly JugueteriaContext _context;

        public CategoriaService(JugueteriaContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Categoria>> GetAllCategoriasAsync()
        {
            return await _context.Categorias
                .Where(c => c.Activo)
                .OrderBy(c => c.Nombre)
                .ToListAsync();
        }

        public async Task<Categoria?> GetCategoriaByIdAsync(int id)
        {
            return await _context.Categorias
                .FirstOrDefaultAsync(c => c.Id == id && c.Activo);
        }

        public async Task<Categoria> CreateCategoriaAsync(Categoria categoria)
        {
            categoria.FechaCreacion = DateTime.Now;
            categoria.Activo = true;
            
            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();
            return categoria;
        }

        public async Task<Categoria> UpdateCategoriaAsync(Categoria categoria)
        {
            var existingCategoria = await _context.Categorias.FindAsync(categoria.Id);
            if (existingCategoria == null)
                throw new ArgumentException("Categoría no encontrada");

            existingCategoria.Nombre = categoria.Nombre;
            existingCategoria.Descripcion = categoria.Descripcion;
            existingCategoria.ImagenUrl = categoria.ImagenUrl;

            await _context.SaveChangesAsync();
            return existingCategoria;
        }

        public async Task DeleteCategoriaAsync(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria != null)
            {
                categoria.Activo = false;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> CategoriaExistsAsync(int id)
        {
            return await _context.Categorias.AnyAsync(c => c.Id == id && c.Activo);
        }
    }
} 