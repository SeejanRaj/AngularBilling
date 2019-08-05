using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AngularBilling.Models
{
    public class ProductModel
    {
        [Key]
        public int ProductId { get; set; }
        [Required]
        [MaxLength(50)]
        [Display(Name = "Product Name")]
        public string ProductName { get; set; }
        [Required]
        public double Rate { get; set; }

        public ICollection<SalesModel> SalesModels { get; set; }
    }
}
