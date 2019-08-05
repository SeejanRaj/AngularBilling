using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularBilling.Data
{
    public class UserSeed
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public UserSeed(RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager, ApplicationDbContext context) {
            _userManager = userManager;
            _context = context;
            _roleManager = roleManager;
        }



        public void SeedUser()
        {
           
                var user = new IdentityUser
                {
                    Id = "86773b08-3af0-4ae6-94fa-01ddfe4bc5e8",
                    Email = "seejan.raj@gmail.com",
                    NormalizedEmail = "SEEJAN.RAJ@GMAIL.COM",
                    UserName = "seejan",
                    NormalizedUserName = "SEEJAN",
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString("D")
                };

                var password = new PasswordHasher<IdentityUser>();
                var hashed = password.HashPassword(user, "Appleballcat1@");
                user.PasswordHash = hashed;
             _userManager.CreateAsync(user);

           _userManager.AddToRoleAsync(user, "Admin");
            
            
            
        }

       
    }
}
