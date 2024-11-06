using Auth.ApplicationService.Startup;
using Cinema.ApplicationService.Startup;
using Movie.ApplicationService.Startup;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Configure Movie
            builder.ConfigureMovie(typeof(Program).Namespace);
            builder.ConfigureCinema(typeof(Program).Namespace);
            builder.ConfigureAuth(typeof(Program).Namespace);

            // Add CORS configuration
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Enable static files
            app.UseStaticFiles();

            // Enable CORS
            app.UseCors("AllowAllOrigins");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
