using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DTO
{
    public class LikeDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public int Age { get; set; }
        public string PhotoUrl { get; set; }
        public string Country { get; set; }
    }
}