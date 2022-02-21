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

        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            
            if(file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var paramsUpload = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
                };
                uploadResult = await _cloudinary.UploadAsync(paramsUpload);
            }

            return uploadResult;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var paramsDelete = new DeletionParams(publicId);

            var result = await _cloudinary.DestroyAsync(paramsDelete);

            return result;
        }
    }
}