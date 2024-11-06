using Auth.ApplicationService.UserModule.Abstracts;
using Auth.Dtos;
using Cinema.ApplicationService.CinemaModule.Abstracts;
using Cinema.ApplicationService.CinemaModule.Implements;
using Cinema.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("create-user")]
        public IActionResult CreateUser(CreateUserDto input)
        {
            var result = _userService.CreateUser(input);
            return Ok(new { message = "Thêm thành công", data = result });
        }

        [HttpPut("update-user")]
        public IActionResult UpdateUser(UpdateUserDto input)
        {
            _userService.UpdateUser(input);
            return Ok(new { message = "Cập nhật thành công" });
        }

        [HttpDelete("delete-user/{id}")]
        public IActionResult DeleteUser(int id)
        {
            _userService.DeleteUser(id);
            return Ok(new { message = "Xóa thành công" });
        }

        [HttpGet("get-all-user")]
        public IActionResult GetAllUser()
        {

            return Ok(_userService.GetAllUser());
        }

        [HttpGet("get-user/{id}")]
        public IActionResult GetIdUser(int id)
        {

            return Ok(_userService.GetIdUser(id));
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto input)
        {
            var isPasswordValid = _userService.VerifyPassword(input.Email, input.Password);

            if (!isPasswordValid)
            {
                return Unauthorized(new { message = "Mật khẩu hoặc tài khoản không chính xác" });
            }

            return Ok(new { message = "Đăng nhập thành công" });
        }
    }
}
