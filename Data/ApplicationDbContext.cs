using AngularBilling.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularBilling.Data
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
        {
          
        }
        //creating roles
        protected override void OnModelCreating(ModelBuilder builder)
        {
           
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>().HasData(
           new { Id = "1", Name = "Admin", NormalizedName = "ADMIN" }
           );


            //builder.Entity<IdentityUser>().HasData(
            //    new {
            //        Id = "6a6eb6c2-dd53-4379-80f7-9f1fa377b8f1",
            //        UserName ="seejan",
            //        Email ="seejan.raj@gmail.com",
            //        PasswordHash= "AQAAAAEAACcQAAAAEMIslHhGT3TNluSQoAYF45qN6UCpvhPF3L0yCUNPIuDHP+KQ37BVm6pJnggHkiawpw==",
            //        SecurityStamp= "J4MPSKUCX7VVGEDVLVRTZ7IWFIFXKTPW",
            //        ConcurrencyStamp= "d12c579a-54fc-4b52-a140-04d03c1d1740",
            //        AccessFailedCount = 0,
            //        EmailConfirmed= true,
            //        LockoutEnabled = false,
            //        PhoneNumberConfirmed = true,
            //        TwoFactorEnabled=false
            //    }
            //);
            //builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            //{

            //    UserId = "86773b08-3af0-4ae6-94fa-01ddfe4bc5e8",
            //    RoleId = "1"
            //});



        }

        public DbSet<CustomerModel> Customers{ get; set; }
        public DbSet<ProductModel> Products { get; set; }
        public DbSet<SalesModel> Sales { get; set; }
      
    }
}
