using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.DTO;
using Backend.Entities;

namespace Backend.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int userId, int likedUserId);
        Task<User> GetUserWithLikes(int userId);
        Task<IEnumerable<LikeDTO>> GetUserLikes(string predicate, int userId);

    }
}