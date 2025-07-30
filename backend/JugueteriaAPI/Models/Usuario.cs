using System.ComponentModel.DataAnnotations;

namespace JugueteriaAPI.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string Apellido { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        [StringLength(150)]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        [StringLength(20)]
        public string Telefono { get; set; } = string.Empty;
        
        [StringLength(200)]
        public string? Direccion { get; set; }
        
        [StringLength(100)]
        public string? Ciudad { get; set; }
        
        [StringLength(10)]
        public string? CodigoPostal { get; set; }
        
        public bool Activo { get; set; } = true;
        
        public DateTime FechaRegistro { get; set; } = DateTime.Now;
        
        // Relación con pedidos
        public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
    }
} 