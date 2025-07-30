using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JugueteriaAPI.Models
{
    public class DetallePedido
    {
        public int Id { get; set; }
        
        public int PedidoId { get; set; }
        public virtual Pedido Pedido { get; set; } = null!;
        
        public int ProductoId { get; set; }
        public virtual Producto Producto { get; set; } = null!;
        
        public int Cantidad { get; set; }
        
        [Column(TypeName = "decimal(10,2)")]
        public decimal PrecioUnitario { get; set; }
        
        [Column(TypeName = "decimal(10,2)")]
        public decimal Subtotal { get; set; }
    }
} 