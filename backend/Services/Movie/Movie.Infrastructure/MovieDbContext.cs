using Microsoft.EntityFrameworkCore;
using Movie.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.Infrastructure
{
    public class MovieDbContext : DbContext
    {
        public DbSet<MovMovie> Movies { get; set; }
        public DbSet<MovCensor> Censors { get; set; }

        public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<MovMovie>()
                .HasOne<MovCensor>()
                .WithMany()
                .HasForeignKey(e => e.CensorId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}
