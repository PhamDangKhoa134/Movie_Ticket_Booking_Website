using Auth.ApplicationService.UserModule.Abstracts;
using Auth.ApplicationService.UserModule.Implements;
using Auth.Infrastructure;
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

namespace Auth.ApplicationService.Startup
{
    public static class AuthStartup
    {
        public static void ConfigureAuth(this WebApplicationBuilder builder, string? assemblyName)
        {
            builder.Services.AddDbContext<AuthDbContext>(
                options =>
                {
                    options.UseSqlServer(
                        builder.Configuration.GetConnectionString("Default"),
                        options =>
                        {
                            options.MigrationsAssembly(assemblyName);
                            options.MigrationsHistoryTable(
                                DbSchema.TableMigrationsHistory,
                                DbSchema.Auth
                            );
                        }
                    );
                },
                ServiceLifetime.Scoped
            );
            builder.Services.AddScoped<IUserService, UserService>();

        }
    }
}
