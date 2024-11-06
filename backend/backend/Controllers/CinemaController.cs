using Cinema.ApplicationService.CinemaModule.Abstracts;
using Cinema.Dtos;
using Microsoft.AspNetCore.Mvc;
using Movie.ApplicationService.MovieModule.Abstracts;
using Movie.ApplicationService.MovieModule.Implements;
using Movie.Dtos;

namespace backend.Controllers
{
    public class CinemaController : ControllerBase
    {
        private readonly ICinemaService _cinemaService;
        public CinemaController(ICinemaService cinemaService)
        {
            _cinemaService = cinemaService;
        }

        [HttpPost("createTypeSeat")]
        public IActionResult CreateTypeSeat(CreateTypeSeatDto input)
        {
            var result = _cinemaService.CreateTypeSeat(input);
            return Ok(new { message = "Thêm thành công", data = result });
        }

        [HttpPut("updateTypeSeat")]
        public IActionResult UpdateTypeSeat(UpdateTypeSeatDto input)
        {
            _cinemaService.UpdateTypeSeat(input);
            return Ok(new { message = "Cập nhật thành công"});
        }

        [HttpDelete("deleteTypeSeat/{id}")]
        public IActionResult DeleteTypeSeat(int id)
        {
            _cinemaService.DeleteTypeSeat(id);
            return Ok(new { message = "Xóa thành công" });
        }

        [HttpGet("get-all-type-seat")]
        public IActionResult GetAllTypeSeat()
        {

            return Ok(_cinemaService.GetAllTypeSeat());
        }

        [HttpGet("get-type-seat/{id}")]
        public IActionResult GetIdTypeSeat(int id)
        {

            return Ok(_cinemaService.GetIdTypeSeat(id));
        }
    }
}
