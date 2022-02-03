using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Backend.Data;
using Backend.DTO;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        // Get all users
        // api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }
        
        // Get one user
        // api/users/1
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            return user;
        }

        // Register User
        // api/users/register
        [HttpPost("register")]
        public async Task<ActionResult<User>> RegisterUser(RegisterDTO reg)
        {
            // Check if username already exists in db
            if(await _context.Users.AnyAsync(user => user.UserName == reg.UserName.ToLower()))
            {
                return BadRequest("Username taken!");
            } 

            // Check if email already exists in db
            if(await _context.Users.AnyAsync(user => user.Email == reg.Email.ToLower()))
            {
                return BadRequest("Email taken!");
            }

            using var hmac = new HMACSHA512(); // Hashing 
            User user = new User
            {
                UserName = reg.UserName.ToLower(),
                Email = reg.Email,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(reg.Password)),
                PasswordSalt = hmac.Key // HMACSHA512 generates a key and that key will be used as salt for the PW
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            
            return user;
        }

    }
}