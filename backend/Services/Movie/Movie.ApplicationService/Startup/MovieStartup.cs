using Contstant.Database;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Movie.ApplicationService.MovieModule.Abstracts;
using Movie.ApplicationService.MovieModule.Implements;
using Movie.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.ApplicationService.Startup
{
    public static class MovieStartup
    {
        public static void ConfigureMovie(this WebApplicationBuilder builder, string? assemblyName)
        {
            builder.Services.AddDbContext<MovieDbContext>(
                options =>
                {
                    options.UseSqlServer(
                        builder.Configuration.GetConnectionString("Default"),
                        options =>
                        {
                            options.MigrationsAssembly(assemblyName);
                            options.MigrationsHistoryTable(
                                DbSchema.TableMigrationsHistory,
                                DbSchema.Movie
                            );
                        }
                    );
                },
                ServiceLifetime.Scoped
            );
            builder.Services.AddScoped<IMovieService, MovieService>();

        }
    }
}
