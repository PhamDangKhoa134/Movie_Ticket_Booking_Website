using Microsoft.AspNetCore.Mvc;
using Movie.ApplicationService.MovieModule.Abstracts;
using Movie.Dtos;

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
        public IActionResult UpdateMovie(UpdateMovieDto input)
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
    }
}
