using Auth.ApplicationService.Common;
using Auth.ApplicationService.UserModule.Abstracts;
using Auth.Domain;
using Auth.Dtos;
using Auth.Infrastructure;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Shared.ApplicationService;

namespace Auth.ApplicationService.UserModule.Implements
{
    public class UserService : AuthServiceBase, IUserService
    {
        private IConfiguration _configuration;
        private readonly Jwtsettings _jwtsettings;

        public UserService(IConfiguration configuration, Jwtsettings jwtsettings,ILogger<UserService> logger, AuthDbContext dbContext) : base(logger, dbContext)
        {
            _configuration = configuration;
            _jwtsettings = jwtsettings;
        }

        public UserDto CreateUser(CreateUserDto input)
        {
            var existUser = _dbContext.Users.FirstOrDefault(s => s.Phone.ToLower() == input.Phone.ToLower() || s.Email.ToLower() == input.Email.ToLower());
            if (existUser == null)
            {
                var passwordHasher = new PasswordHasher<AuthUser>();

                var user = new AuthUser()
                {
                    LastName = input.LastName,
                    FirstName = input.FistName,
                    Email = input.Email,
                    Phone = input.Phone,
                    Address = input.Address,
                    Password = passwordHasher.HashPassword(null, input.Password), // Băm mật khẩu
                    RoleId = input.RoleId,
                };

                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();

                return new UserDto
                {
                    Id = user.Id,
                    LastName = input.LastName,
                    FirstName = input.FistName,
                    Email = input.Email,
                    Phone = input.Phone,
                    Address = input.Address,
                    RoleId = input.RoleId,
                };
            }
            else
            {
                throw new Exception("Số điện thoại hoặc email này đã tồn tại!!!");
            }
        }

        public void DeleteUser(int id)
        {
            var findUser = FindUser(id);
            _dbContext.Users.Remove(findUser);
            _dbContext.SaveChanges();
        }

        public AuthUser FindUser(int id)
        {
            var user = _dbContext.Users.FirstOrDefault(p => p.Id == id);
            if (user == null)
            {
                throw new Exception("Không tìm thấy người dùng cần tìm");
            }
            return user;
        }

        public List<UserDto> GetAllUser()
        {
            var result = _dbContext.Users.OrderByDescending(p => p.Id).ThenByDescending(p => p.Id).Select(p => new UserDto
            {
                Id = p.Id,
                FirstName = p.FirstName,
                LastName = p.LastName,
                Email = p.Email,
                Phone = p.Phone,
                Address = p.Address,
            });
            return result.ToList();
        }

        public UserDto GetIdUser(int id)
        {
            var findUser = FindUser(id);
            return new UserDto
            {
                Id = findUser.Id,
                FirstName = findUser.FirstName,
                LastName= findUser.LastName,
                Email = findUser.Email,
                Phone = findUser.Phone,
                Address = findUser.Address,
            };
        }

        public string LoginUser(LoginDto input)
        {
            try
            {
                var user = CheckUser(input);
                if (user != null)
                {
                    var token = Createtokens(user);
                    return token;
                }
                throw new Exception("Không tìm thấy user");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void UpdateUser(UpdateUserDto input)
        {
            var passwordHasher = new PasswordHasher<AuthUser>();
            var findUser = FindUser(input.Id);
            findUser.FirstName = input.FistName;
            findUser.LastName = input.LastName;
            findUser.Address = input.Address;
            _dbContext.Update(findUser);
            _dbContext.SaveChanges();
        }

        public bool VerifyPassword(string email, string password)
        {
            // Tìm người dùng dựa trên email hoặc số điện thoại
            var user = _dbContext.Users.FirstOrDefault(u => u.Email == email);
            if (user == null)
            {
                return false; // Không tìm thấy người dùng
            }

            var passwordHasher = new PasswordHasher<AuthUser>();

            // Kiểm tra mật khẩu
            var verificationResult = passwordHasher.VerifyHashedPassword(user, user.Password, password);

            return verificationResult == PasswordVerificationResult.Success;
        }

        private UserDto CheckUser(LoginDto userLogin)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Email.ToLower() == userLogin.Email.ToLower());
            if (user == null || !VerifyPassword(user.Email, userLogin.Password))
                return null;

            // Mapping AuthUser to UserDto
            return new UserDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Phone = user.Phone,
                Address = user.Address,
                RoleId = user.RoleId
            };
        }

        private string Createtokens(UserDto user)
        {
            var roleUser = _dbContext.Roles.FirstOrDefault(s => s.Id == user.RoleId);

            var claims = new[]
            {
                new Claim("Id", user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Name, user.FirstName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("Roles", roleUser.Name),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtsettings.SecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwtsettings.Issuer,
                audience: _jwtsettings.Audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(_jwtsettings.ExpiryMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public PageResultDto<UserDto> GetAll(FilterDto input)
        {
            var result = new PageResultDto<UserDto>();
            var query = _dbContext.Users.Where(e =>
                (string.IsNullOrEmpty(input.Keyword)
                || e.FirstName.ToLower().Contains(input.Keyword.ToLower()))
                && e.RoleId == 2 // Thêm điều kiện RoleId = 2
            );

            result.TotalAuth = query.Count();

            query = query
                .OrderByDescending(s => s.FirstName) // Sắp xếp theo ngày sinh giảm dần và Id giảm dần
                .ThenByDescending(s => s.Id)
                .Skip(input.Skip())
                .Take(input.PageSize);

            result.Auths = query
                .Select(s => new UserDto
                {
                    Id = s.Id,
                    LastName = s.LastName,
                    FirstName = s.FirstName,
                    Email = s.Email,
                    Address = s.Address,
                    Phone = s.Phone,
                })
                .ToList();

            return result;
        }

    }
}
