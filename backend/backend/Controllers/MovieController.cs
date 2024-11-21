using Microsoft.AspNetCore.Mvc;
using Movie.ApplicationService.MovieModule.Abstracts;
using Movie.Dtos;
using Shared.ApplicationService;

namespace backend.Controllers
{
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;
        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpPost("create")]
        public async Task<ActionResult<MovieDto>> CreateMovie([FromForm] CreateMovieDto input)
        {
            var result = await _movieService.CreateMovie(input);
            return Ok(result);
        }

        [HttpPut("update")]
        public IActionResult UpdateMovie([FromForm] UpdateMovieDto input)
        {
            _movieService.UpdateMovie(input);
            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteMovie(int id)
        {
            _movieService.DeleteMovie(id);
            return Ok();
        }

        [HttpGet("get-all")]
        public IActionResult GetAllMovie()
        {

            return Ok(_movieService.GetAllMovie());
        }

        [HttpGet("get/{id}")]
        public IActionResult GetIdMovie(int id)
        {

            return Ok(_movieService.GetIdMovie(id));
        }

        [HttpGet("get-all-movie-page")]
        public IActionResult GetAllPage([FromQuery] FilterDto input)
        {
            try
            {
                return Ok(_movieService.GetAll(input));
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse
                {
                    Message = ex.Message
                });
            }
        }

        [HttpGet("get-censor/{id}")]
        public IActionResult GetIdCensor(int id)
        {

            return Ok(_movieService.GetIdCensor(id));
        }
    }
}
