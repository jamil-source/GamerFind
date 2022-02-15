using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Backend.Data;
using Backend.DTO;
using Backend.Entities;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly TokenService _tokenService;
        public UsersController(DataContext context, TokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        // Get all users
        // api/users
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }

        // Get one user
        // api/users/1
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            return user;
        }

        // Register User
        // api/users/register
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> RegisterUser(RegisterDTO reg)
        {
            // Check if username already exists in db
            if (await _context.Users.AnyAsync(user => user.UserName == reg.UserName.ToLower()))
            {
                return BadRequest("Username taken!");
            }

            // Check if email already exists in db
            if (await _context.Users.AnyAsync(user => user.Email == reg.Email.ToLower()))
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

            return new UserDTO
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO login)
        {
            User user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == login.UserName.ToLower());

            if (user == null)
            {
                return Unauthorized("Invalid username");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                {
                    return Unauthorized("Inavlid password");
                }
            }

            return new UserDTO
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

    }
}