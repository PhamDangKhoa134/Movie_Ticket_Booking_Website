﻿using Microsoft.AspNetCore.Mvc;
using Movie.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.ApplicationService.MovieModule.Abstracts
{
    public interface IMovieService
    {
        Task<ActionResult<MovieDto>> CreateMovie(CreateMovieDto input);
        void DeleteMovie(int id);
        MovieDto GetIdMovie(int id);
        List<MovieDto> GetAllMovie();
        void UpdateMovie(UpdateMovieDto input);
    }
}