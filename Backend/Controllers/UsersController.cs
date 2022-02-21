using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Backend.Data;
using Backend.DTO;
using Backend.Entities;
using Backend.Interfaces;
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
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public UsersController(DataContext context, TokenService tokenService, IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _tokenService = tokenService;
            _userRepository = userRepository;
            _mapper = mapper;
            _context = context;
        }

        // Get all users
        // api/users
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();

            return Ok(users);
        }

        // Get one user
        // api/users/1
        [Authorize]
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDTO>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
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

        // Login User
        // api/users/login
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO login)
        {
            User user = await _context.Users.Include(photo => photo.Photos).SingleOrDefaultAsync(u => u.UserName == login.UserName.ToLower());

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
                Token = _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(photo => photo.MainPhoto)?.Url
            };
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByUsernameAsync(username);

            _mapper.Map(memberUpdateDto, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Update failed!");
        }

        [HttpPost("upload-photo")]
        public async Task<ActionResult<PhotoDTO>> UploadPhoto(IFormFile file)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _userRepository.GetUserByUsernameAsync(username);

            var result = await _photoService.AddPhotoAsync(file);

            // If we get error from photoservice
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            // If no errors
            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (user.Photos.Count == 0)
            {
                photo.MainPhoto = true;
            }

            user.Photos.Add(photo);

            if (await _userRepository.SaveAllAsync())
            {
                return _mapper.Map<PhotoDTO>(photo);
            }
            return BadRequest("Photo could not be added!");
        }

        [HttpPut("main-photo/{photoId}")]
        public async Task<ActionResult> SetPhotoToMain(int photoId)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _userRepository.GetUserByUsernameAsync(username);

            var photo = user.Photos.FirstOrDefault(photo => photo.Id == photoId);

            if (photo.MainPhoto)
            {
                return BadRequest("Already main!");
            }

            var currentMain = user.Photos.FirstOrDefault(p => p.MainPhoto);

            // Set current main photo to false

            if (currentMain != null)
            {
                currentMain.MainPhoto = false;
            }

            // Set new one to true

            photo.MainPhoto = true;

            if (await _userRepository.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Can not set main photo!");
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _userRepository.GetUserByUsernameAsync(username);

            var photo = user.Photos.FirstOrDefault(p => p.Id == photoId);

            if (photo == null)
            {
                return NotFound();
            }

            if (photo.MainPhoto)
            {
                return BadRequest("Can not delete main photo!");
            }

            if (photo.PublicId != null)
            {
                var response = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (response.Error != null)
                {
                    return BadRequest(response.Error.Message);
                }
            }
            user.Photos.Remove(photo);

            if(await _userRepository.SaveAllAsync())
            {
                return Ok();
            }
            return BadRequest("Could not delete photo!");
        }

    }
}