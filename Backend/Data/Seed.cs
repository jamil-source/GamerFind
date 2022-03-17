using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text.Json;
using System.Text;
using System.Threading.Tasks;
using Backend.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Backend.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<User> userManager)
        {
            if (await userManager.Users.AnyAsync())
            {
                return;
            }

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<User>>(userData);

            // Foreach seeded user 
            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                user.Email = user.UserName.ToLower() + "@example.com";
                await userManager.CreateAsync(user, "Lösenord123");
            }
            
        }
    }
}