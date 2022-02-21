using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Helpers;
using Backend.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace Backend.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;
        // IOption interface gets configurations witch in our case is cloudinary keys
        public PhotoService(IOptions<CloudinarySettings> config)
        {
            var account = new Account
            (
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(account);
        }

        public Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            throw new NotImplementedException();
        }

        public Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            throw new NotImplementedException();
        }
    }
}