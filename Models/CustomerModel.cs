using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AngularBilling.Models
{
    public class CustomerModel
    {
        [Key]
        public int CustomerId { get; set; }
        [Required]
        [MaxLength(50)]
        [Display(Name = "Customer Name")]
        public string CustomerName { get; set; }
        [Required]
        public string Phone { get; set; }

        public ICollection<SalesModel> SalesModels { get; set; }
    }
}
