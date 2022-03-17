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
using Backend.Extensions;
using Backend.Helpers;
using Backend.Interfaces;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public UsersController(DataContext context, UserManager<User> userManager, SignInManager<User> signInManager, TokenService tokenService, IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
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
        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers([FromQuery] UserParams userParams)
        {


            userParams.CurrentUsername = User.GetUsername();

            if (string.IsNullOrEmpty(userParams.GameType))
            {
                userParams.GameType = "PVE";
            }

            var users = await _userRepository.GetMembersAsync(userParams);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
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
            if (await _userManager.Users.AnyAsync(user => user.UserName == reg.UserName.ToLower()))
            {
                return BadRequest("Username taken!");
            }

            // Check if email already exists in db
            if (await _userManager.Users.AnyAsync(user => user.Email == reg.Email.ToLower()))
            {
                return BadRequest("Email taken!");
            }

            var user = _mapper.Map<User>(reg);

            user.UserName = reg.UserName.ToLower();
            user.Email = reg.Email;

            var result = await _userManager.CreateAsync(user, reg.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return new UserDTO
            {
                UserName = user.UserName,
                Token = await _tokenService.CreateToken(user),
                GameType = user.GameType
            };
        }

        // Login User
        // api/users/login
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO login)
        {
            User user = await _userManager.Users.Include(photo => photo.Photos).SingleOrDefaultAsync(u => u.UserName == login.UserName.ToLower());

            if (user == null)
            {
                return Unauthorized("Invalid username");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, login.Password, false);

            if (!result.Succeeded)
            {
                return Unauthorized();
            }

            return new UserDTO
            {
                UserName = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(photo => photo.MainPhoto)?.Url,
                GameType = user.GameType
            };
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberUpdateDto)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            _mapper.Map(memberUpdateDto, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Update failed!");
        }

        [HttpPost("upload-photo")]
        [Authorize]
        public async Task<ActionResult<PhotoDTO>> UploadPhoto(IFormFile file)
        {

            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

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
        [Authorize]
        public async Task<ActionResult> SetPhotoToMain(int photoId)
        {

            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

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
        [Authorize]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {

            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

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

            if (await _userRepository.SaveAllAsync())
            {
                return Ok();
            }
            return BadRequest("Could not delete photo!");
        }

    }
}