using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Entities
{
    public class UserLike
    {
        public User User { get; set; }
        public int UserId { get; set; }
        public User LikedUser { get; set; }
        public int LikedUserId { get; set; }
    }
}