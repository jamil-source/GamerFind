using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class RegisterController : BaseApiController
    {
        private readonly DataContext _context;
        public RegisterController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(string username, string email, string password)
        {
            using var hmac = new HMACSHA512(); // Hashing 
            User user = new User
            {
                UserName = username,
                Email = email,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
                PasswordSalt = hmac.Key // HMACSHA512 generates a key and that key will be used as salt for the PW
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            
            return user;
        }
    }
}