using Contstant.Database;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Show.ApplicationService.ShowModule.Abstracts;
using Show.ApplicationService.ShowModule.Implements;
using Show.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Show.ApplicationService.Startup
{
    public static class ShowStartup
    {
        public static void ConfigureShow(this WebApplicationBuilder builder, string? assemblyName)
        {
            builder.Services.AddDbContext<ShowDbContext>(
                options =>
                {
                    options.UseSqlServer(
                        builder.Configuration.GetConnectionString("Default"),
                        options =>
                        {
                            options.MigrationsAssembly(assemblyName);
                            options.MigrationsHistoryTable(
                                DbSchema.TableMigrationsHistory,
                                DbSchema.Show
                            );
                        }
                    );
                },
                ServiceLifetime.Scoped
            );
            builder.Services.AddScoped<IShowService, ShowService>();

        }
    }
}
