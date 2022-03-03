using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.DTO;
using Backend.Entities;
using Backend.Extensions;
using Backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class LikesRepository : ILikesRepository
    {
        private readonly DataContext _context;
        public LikesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<UserLike> GetUserLike(int userId, int likedUserId)
        {
            return await _context.Likes.FindAsync(userId, likedUserId);
        }

        public async Task<IEnumerable<LikeDTO>> GetUserLikes(string likedOrLikedBy, int userId)
        {
            var users = _context.Users.OrderBy(user => user.UserName).AsQueryable();
            var likes = _context.Likes.AsQueryable();

            if (likedOrLikedBy == "liked")
            {
                likes = likes.Where(like => like.UserId == userId);
                users = likes.Select(like => like.LikedUser);
            }

            if (likedOrLikedBy == "likedBy")
            {
                likes = likes.Where(like => like.LikedUserId == userId);
                users = likes.Select(like => like.User);
            }

            return await users.Select(user => new LikeDTO
            {
                Id = user.Id,
                UserName = user.UserName,
                Age = user.DateOfBirth.CalculateAge(),
                PhotoUrl = user.Photos.FirstOrDefault(p => p.MainPhoto).Url,
                Country = user.Country
            }).ToListAsync();
        }

        public async Task<User> GetUserWithLikes(int userId)
        {
            return await _context.Users
                .Include(l => l.LikedUsers)
                .FirstOrDefaultAsync(u => u.Id == userId);
        }
    }
}