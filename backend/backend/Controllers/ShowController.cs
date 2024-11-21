using Cinema.ApplicationService.CinemaModule.Abstracts;
using Cinema.ApplicationService.CinemaModule.Implements;
using Cinema.Dtos;
using Microsoft.AspNetCore.Mvc;
using Shared.ApplicationService;
using Show.ApplicationService.ShowModule.Abstracts;
using Show.Dtos;
using static Show.ApplicationService.ShowModule.Implements.ShowService;

namespace backend.Controllers
{
    public class ShowController : ControllerBase
    {
        private readonly IShowService _showService;
        public ShowController(IShowService showService)
        {
            _showService = showService;
        }

        [HttpPost("create-show")]
        public IActionResult CreateShow([FromBody]CreateShowDto input)
        {
            var result = _showService.CreateShow(input);
            return Ok(new { message = "Thêm thành công", data = result });
        }

        [HttpPut("update-show")]
        public IActionResult UpdateShow([FromBody] UpdateShowDto input)
        {
            _showService.UpdateShow(input);
            return Ok(new { message = "Cập nhật thành công" });
        }

        [HttpDelete("delete-show/{id}")]
        public IActionResult DeleteShow(int id)
        {
            _showService.DeleteShow(id);
            return Ok(new { message = "Xóa thành công" });
        }

        [HttpGet("get-all-show")]
        public IActionResult GetAllShow()
        {

            return Ok(_showService.GetAllShow());
        }

        [HttpGet("get-show/{id}")]
        public IActionResult GetIdShow(int id)
        {

            return Ok(_showService.GetIdShow(id));
        }

        [HttpPost("create-booking")]
        public IActionResult CreateBooking([FromBody] CreateBookingDto input)
        {
            var result = _showService.CreateBooking(input);
            return Ok(new { message = "Thêm thành công", data = result });
        }

        [HttpPut("update-booking")]
        public IActionResult UpdateBooking([FromBody] UpdateBookingDto input)
        {
            _showService.UpdateBooking(input);
            return Ok(new { message = "Cập nhật thành công" });
        }

        [HttpDelete("delete-booking/{id}")]
        public IActionResult DeleteBooking(int id)
        {
            _showService.DeleteBooking(id);
            return Ok(new { message = "Xóa thành công" });
        }

        [HttpGet("get-all-booking")]
        public IActionResult GetAllBooking()
        {

            return Ok(_showService.GetAllBooking());
        }

        [HttpGet("get-booking/{id}")]
        public IActionResult GetIdBooking(int id)
        {

            return Ok(_showService.GetIdBooking(id));
        }

        [HttpPut("update-show-cinema")]
        public IActionResult UpdateShowCinema( UpdateShowCinemaDto input)
        {
            _showService.UpdateShowCinema(input);
            return Ok(new { message = "Cập nhật thành công" });
        }

        [HttpGet("get-all-show-cinema/{id}")]
        public IActionResult ShowCinema(int id)
        {       
            return Ok(_showService.ShowCinema(id));
        }

        [HttpGet("get-all-show-by-movieId/{id}")]
        public IActionResult GetAllShowByIdMovie(int id)
        {
            return Ok(_showService.GetAllShowByIdMovie(id));
        }

        [HttpGet("get-all-show-page")]
        public IActionResult GetAllShowPage([FromQuery] FilterDto input)
        {
            try
            {
                return Ok(_showService.GetAllShow(input));
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse
                {
                    Message = ex.Message
                });
            }
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendEmail([FromBody] EmailDto emailDto)
        {
            try
            {
                await _showService.SendEmailAsync(emailDto.ToEmail, emailDto.Subject, emailDto.Body);
                return Ok(new { message = "Email sent successfully!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error sending email: {ex.Message}" });
            }
        }
    }
}
