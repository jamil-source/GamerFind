using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Backend.Entities;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Services
{
    public class TokenService
    {
        private readonly SymmetricSecurityKey _key; // used for sign JWT token and make sure that the signature is verified.
        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        public string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName), // a user Claims that his username is Karl123 for example
                 
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature); // the algoritm for encrypting

            var tknDesc = new SecurityTokenDescriptor // describe the token, and lifetime
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            var tknHandler = new JwtSecurityTokenHandler();

            var tkn = tknHandler.CreateToken(tknDesc);

            return tknHandler.WriteToken(tkn);
        }
    }
}