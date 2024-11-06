using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Movie.ApplicationService.Common;
using Movie.ApplicationService.MovieModule.Abstracts;
using Movie.Domain;
using Movie.Dtos;
using Movie.Infrastructure;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.IO;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Movie.ApplicationService.MovieModule.Implements
{
    public class MovieService : MovieServiceBase, IMovieService
    {
        public MovieService(ILogger<MovieService> logger, MovieDbContext dbContext) : base(logger, dbContext)
        {
        }

        public async Task<ActionResult<MovieDto>> CreateMovie(CreateMovieDto input)
        {
            var existMovie = _dbContext.Movies.FirstOrDefault(s => s.Name.ToLower() == input.Name.ToLower());
            if (existMovie == null)
            {
                var movie = new MovMovie()
                {
                    Name = input.Name,
                    Country = input.Country,
                    Category = input.Category,
                    Duration = input.Duration,
                    Actor = input.Actor,
                    Director = input.Director,
                    Description = input.Description,
                    CensorId = input.CensorId,

                };
                if (input.MovieImg.Length > 0)
                {
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "MovieImages", input.MovieImg.FileName);
                    using (var stream = System.IO.File.Create(path))
                    {
                        await input.MovieImg.CopyToAsync(stream);
                    }
                    movie.MovieImage = "/MovieImages/" + input.MovieImg.FileName;
                }
                else
                {
                    movie.MovieImage = "";
                }

                if (input.BackgroundImg.Length > 0)
                {
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "BackgroundImages", input.BackgroundImg.FileName);
                    using (var stream = System.IO.File.Create(path))
                    {
                        await input.BackgroundImg.CopyToAsync(stream);
                    }
                    movie.BackgroundImage = "/BackgroundImages/" + input.BackgroundImg.FileName;
                }
                else
                {
                    movie.BackgroundImage = "";
                }
                _dbContext.Movies.Add(movie);
                _dbContext.SaveChanges();
                return new MovieDto
                {
                    Id = movie.Id,
                    Name = input.Name,
                    Country = input.Country,
                    Category = input.Category,
                    Duration = input.Duration,
                    Actor = input.Actor,
                    Director = input.Director,
                    Description = input.Description,
                    CensorId = input.CensorId,
                    MovieImage = movie.MovieImage,
                    BackgroundImage = movie.BackgroundImage,
                };
            }
            else
            {
                throw new Exception("Phim nay da co!!!");
            }

        }


        public void DeleteMovie(int id)
        {
            var findMovie = FindMovie(id);
            _dbContext.Movies.Remove(findMovie);
            _dbContext.SaveChanges();
        }

        public MovMovie FindMovie(int id)
        {
            var movie = _dbContext.Movies.FirstOrDefault(p => p.Id == id);
            if (movie == null)
            {
                throw new Exception("Không tìm thấy phim cần tìm");
            }
            return movie;
        }


        public void UpdateMovie(UpdateMovieDto input)
        {
            var findMovie = FindMovie(input.Id);
            findMovie.Name = input.Name;
            findMovie.Country = input.Country;
            findMovie.Category = input.Category;
            findMovie.Duration = input.Duration;
            findMovie.Actor = input.Actor;
            findMovie.Director = input.Director;
            findMovie.Description = input.Description;
            findMovie.CensorId = input.CensorId;
            _dbContext.SaveChanges();
        }


        List<MovieDto> IMovieService.GetAllMovie()
        {
            var result = _dbContext.Movies.OrderByDescending(p => p.Id).ThenByDescending(p => p.Id).Select(p => new MovieDto
            {
                Id = p.Id,
                Name = p.Name,
                Country = p.Country,
                Category = p.Category,
                Duration = p.Duration,
                Actor = p.Actor,
                Director = p.Director,
                Description = p.Description,
                CensorId = p.CensorId,
                MovieImage = p.MovieImage,
                BackgroundImage = p.BackgroundImage,
            });
            return result.ToList();
        }

        MovieDto IMovieService.GetIdMovie(int id)
        {
            var findMovie = FindMovie(id);
            return new MovieDto
            {
                Id = findMovie.Id,
                Name = findMovie.Name,
                Country = findMovie.Country,
                Category = findMovie.Category,
                Duration = findMovie.Duration,
                Actor = findMovie.Actor,
                Director = findMovie.Director,
                Description = findMovie.Description,
                CensorId = findMovie.CensorId,
                MovieImage = findMovie.MovieImage,
                BackgroundImage = findMovie.BackgroundImage,
            };
        }
    }
}
