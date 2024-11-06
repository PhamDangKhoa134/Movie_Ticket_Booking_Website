using Auth.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auth.ApplicationService.UserModule.Abstracts
{
    public interface IUserService
    {
        UserDto CreateUser(CreateUserDto input);
        void DeleteUser(int id);
        List<UserDto> GetAllUser();
        UserDto GetIdUser(int id);
        UserDto UpdateUser(UpdateUserDto input);
        bool VerifyPassword(string email, string password);
    }
}
