using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.DTO;
using Backend.Entities;
using Backend.Interfaces;

namespace Backend.Data
{
    public class LikesRepository : ILikesRepository
    {
        private readonly DataContext _context;
        public LikesRepository(DataContext context)
        {
            _context = context;
        }

        public Task<UserLike> GetUserLike(int userId, int likedUserId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<LikeDTO>> GetUserLikes(string predicate, int userId)
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUserWithLikes(int userId)
        {
            throw new NotImplementedException();
        }
    }
}