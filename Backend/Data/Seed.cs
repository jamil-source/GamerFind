using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text.Json;
using System.Text;
using System.Threading.Tasks;
using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if(await context.Users.AnyAsync())
            {
                return;
            }

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<User>>(userData);

            // Foreach seeded user 
            foreach(var user in users)
            {
                using var hmac = new HMACSHA512(); // Hashing 
                user.UserName = user.UserName.ToLower();
                user.Email = user.UserName.ToLower() + "@example.com";
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Lösenord123"));
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);
            }

            await context.SaveChangesAsync();
        }
    }
}