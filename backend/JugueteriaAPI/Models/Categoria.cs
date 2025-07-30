using System.ComponentModel.DataAnnotations;

namespace JugueteriaAPI.Models
{
    public class Categoria
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Descripcion { get; set; }
        
        [StringLength(200)]
        public string? ImagenUrl { get; set; }
        
        public bool Activo { get; set; } = true;
        
        public DateTime FechaCreacion { get; set; } = DateTime.Now;
        
        // Relación con productos
        public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
    }
} 