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

namespace Auth.ApplicationService.UserModule.Implements
{
    public class UserService : AuthServiceBase, IUserService
    {
        public UserService(ILogger<UserService> logger, AuthDbContext dbContext) : base(logger, dbContext)
        {
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
            throw new NotImplementedException();
        }

        public List<UserDto> GetAllUser()
        {
            throw new NotImplementedException();
        }

        public UserDto GetIdUser(int id)
        {
            throw new NotImplementedException();
        }

        public UserDto UpdateUser(UpdateUserDto input)
        {
            throw new NotImplementedException();
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

    }
}
