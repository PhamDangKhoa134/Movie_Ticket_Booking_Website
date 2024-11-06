using Cinema.ApplicationService.CinemaModule.Abstracts;
using Cinema.ApplicationService.CinemaModule.Implements;
using Cinema.Infrastructure;
using Contstant.Database;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cinema.ApplicationService.Startup
{
    public static class CinemaStartup
    {
        public static void ConfigureCinema(this WebApplicationBuilder builder, string? assemblyName)
        {
            builder.Services.AddDbContext<CinemaDbContext>(
                options =>
                {
                    options.UseSqlServer(
                        builder.Configuration.GetConnectionString("Default"),
                        options =>
                        {
                            options.MigrationsAssembly(assemblyName);
                            options.MigrationsHistoryTable(
                                DbSchema.TableMigrationsHistory,
                                DbSchema.Cinema
                            );
                        }
                    );
                },
                ServiceLifetime.Scoped
            );
            builder.Services.AddScoped<ICinemaService, CinemaService>();

        }
    }
}
