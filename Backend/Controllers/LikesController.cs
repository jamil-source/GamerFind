using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.DTO;
using Backend.Entities;
using Backend.Extensions;
using Backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class LikesController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly ILikesRepository _likesRepository;

        public LikesController(IUserRepository userRepository, ILikesRepository likesRepository)
        {
            _userRepository = userRepository;
            _likesRepository = likesRepository;
        }

        [Authorize]
        [HttpPost("{username}")]
        public async Task<ActionResult> AddLike(string username)
        {
            var userId = User.GetUserId();
            var likedUser = await _userRepository.GetUserByUsernameAsync(username);
            var sourceUser = await _likesRepository.GetUserWithLikes(userId);

            if (likedUser == null)
            {
                return NotFound();
            }

            if (sourceUser.UserName == username)
            {
                return BadRequest("Can not like yourself");
            }

            var userLike = await _likesRepository.GetUserLike(userId, likedUser.Id);

            if (userLike != null)
            {
                return BadRequest("You already like this user");
            }

            userLike = new UserLike
            {
                UserId = userId,
                LikedUserId = likedUser.Id
            };

            sourceUser.LikedUsers.Add(userLike); 

            if (await _userRepository.SaveAllAsync())
            {
                return Ok();
            }

            return BadRequest("Could not like user");

        }

        [Authorize]
        [HttpGet]

        public async Task<ActionResult<IEnumerable<LikeDTO>>> GetUserLikes(string likedOrLikedBy)
        {
            var users = await _likesRepository.GetUserLikes(likedOrLikedBy, User.GetUserId());

            return Ok(users);
        }
    }
}