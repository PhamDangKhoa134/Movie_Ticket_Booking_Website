using Auth.ApplicationService.UserModule.Abstracts;
using Auth.Dtos;
using Cinema.ApplicationService.CinemaModule.Abstracts;
using Cinema.ApplicationService.CinemaModule.Implements;
using Cinema.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.ApplicationService;

namespace backend.Controllers
{
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("login-auth")]
        public IActionResult LoginUser(LoginDto input)
        {
            try
            {
                
                var result = _userService.LoginUser(input);
                if (result == null)
                {
                    return Unauthorized(new { message = "Thông tin đăng nhập không hợp lệ" });
                }
                return Ok(new { message = "Đăng nhập thành công", data = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Email và mật khẩu không đúng", error = ex.Message });
            }
        }

        [HttpPost("create-user")]
        public IActionResult CreateUser(CreateUserDto input)
        {
            try
            {
               
                var result = _userService.CreateUser(input);
                if (result == null)
                {
                    return BadRequest(new { message = "Thêm người dùng không thành công" });
                }
                return Ok(new { message = "Thêm thành công", data = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Vui lòng điền đầy đủ thông tin", error = ex.Message });
            }
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

        //[Authorize]
        //[AuthorizationFilter("admin")]
        [HttpGet("get-all-user")]
        public IActionResult GetAllUser()
        {

            return Ok(_userService.GetAllUser());
        }

        //[Authorize]
        //[AuthorizationFilter("user")]
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

        [HttpGet("get-all-user-page")]
        public IActionResult GetAllPage([FromQuery] FilterDto input)
        {
            try
            {
                return Ok(_userService.GetAll(input));
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse
                {
                    Message = ex.Message
                });
            }
        }
    }
}
