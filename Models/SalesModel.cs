using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AngularBilling.Models
{
    public class SalesModel
    {
        [Key]
        public int SalesId { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public bool Invoiced { get; set; }

        public ProductModel ProductModel { get; set; }
        public CustomerModel CustomerModel { get; set; }
    }
}
