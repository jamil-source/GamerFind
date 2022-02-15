using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Backend.DTO;
using Backend.Entities;

namespace Backend.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, MemberDTO>()
                .ForMember(destination => destination.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.MainPhoto).Url));
            CreateMap<Photo, PhotoDTO>();
        }
    }
}