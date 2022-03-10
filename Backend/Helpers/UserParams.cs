using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Helpers
{
    public class UserParams : PaginationParams
    {
        public string CurrentUsername { get; set; }
        public string GameType { get; set; }

        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 200;

    }
}