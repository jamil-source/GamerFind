using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Backend.DTO;
using Backend.Entities;
using Backend.Extensions;

namespace Backend.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, MemberDTO>()
                .ForMember(destination => destination.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.MainPhoto).Url))
                .ForMember(destination => destination.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDTO>();
            CreateMap<MemberUpdateDTO, User>();
            CreateMap<RegisterDTO, User>();
            CreateMap<Message, MessageDTO>()
                .ForMember(destination => destination.SenderPhotoUrl, opt => opt.MapFrom(src => src.Sender.Photos.FirstOrDefault(p => p.MainPhoto).Url))
                .ForMember(destination => destination.ReceiverPhotoUrl, opt => opt.MapFrom(src => src.Receiver.Photos.FirstOrDefault(p => p.MainPhoto).Url));
        }
    }
}