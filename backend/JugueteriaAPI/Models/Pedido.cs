using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JugueteriaAPI.Models
{
    public class Pedido
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(50)]
        public string NumeroPedido { get; set; } = string.Empty;
        
        public int UsuarioId { get; set; }
        public virtual Usuario Usuario { get; set; } = null!;
        
        [Column(TypeName = "decimal(10,2)")]
        public decimal Subtotal { get; set; }
        
        [Column(TypeName = "decimal(10,2)")]
        public decimal Impuestos { get; set; }
        
        [Column(TypeName = "decimal(10,2)")]
        public decimal Total { get; set; }
        
        [StringLength(50)]
        public string Estado { get; set; } = "Pendiente"; // Pendiente, Confirmado, Enviado, Entregado, Cancelado
        
        [StringLength(200)]
        public string? DireccionEnvio { get; set; }
        
        [StringLength(100)]
        public string? CiudadEnvio { get; set; }
        
        [StringLength(10)]
        public string? CodigoPostalEnvio { get; set; }
        
        [StringLength(500)]
        public string? Notas { get; set; }
        
        public DateTime FechaPedido { get; set; } = DateTime.Now;
        
        public DateTime? FechaEnvio { get; set; }
        
        public DateTime? FechaEntrega { get; set; }
        
        // Relación con detalles de pedido
        public virtual ICollection<DetallePedido> DetallesPedido { get; set; } = new List<DetallePedido>();
    }
} 