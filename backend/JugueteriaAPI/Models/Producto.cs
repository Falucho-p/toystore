using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JugueteriaAPI.Models
{
    public class Producto
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Nombre { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string? Descripcion { get; set; }
        
        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Precio { get; set; }
        
        [Column(TypeName = "decimal(10,2)")]
        public decimal? PrecioOferta { get; set; }
        
        [StringLength(200)]
        public string? ImagenUrl { get; set; }
        
        [StringLength(100)]
        public string? Marca { get; set; }
        
        [StringLength(50)]
        public string? EdadRecomendada { get; set; }
        
        public int Stock { get; set; } = 0;
        
        public bool EnOferta { get; set; } = false;
        
        public bool Activo { get; set; } = true;
        
        public DateTime FechaCreacion { get; set; } = DateTime.Now;
        
        // Relación con categoría
        public int CategoriaId { get; set; }
        public virtual Categoria Categoria { get; set; } = null!;
        
        // Relación con detalles de pedido
        public virtual ICollection<DetallePedido> DetallesPedido { get; set; } = new List<DetallePedido>();
    }
} 