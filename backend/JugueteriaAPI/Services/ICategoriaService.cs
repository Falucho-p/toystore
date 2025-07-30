using JugueteriaAPI.Models;

namespace JugueteriaAPI.Services
{
    public interface ICategoriaService
    {
        Task<IEnumerable<Categoria>> GetAllCategoriasAsync();
        Task<Categoria?> GetCategoriaByIdAsync(int id);
        Task<Categoria> CreateCategoriaAsync(Categoria categoria);
        Task<Categoria> UpdateCategoriaAsync(Categoria categoria);
        Task DeleteCategoriaAsync(int id);
        Task<bool> CategoriaExistsAsync(int id);
    }
} 