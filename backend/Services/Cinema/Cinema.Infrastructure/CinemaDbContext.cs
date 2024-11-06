using Cinema.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cinema.Infrastructure
{
    public class CinemaDbContext : DbContext
    {
        public DbSet<CinCinemaHall> CinemaHalls { get; set; }
        public DbSet<CinCinemaHallSeat> CinemaHallSeats { get; set; }
        public DbSet<CinTypeSeat> TypeSeats { get; set; }
        public CinemaDbContext(DbContextOptions<CinemaDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<CinCinemaHallSeat>()
                .HasOne<CinCinemaHall>()
                .WithMany()
                .HasForeignKey(e => e.CinemaID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder
                .Entity<CinCinemaHallSeat>()
                .HasOne<CinTypeSeat>()
                .WithMany()
                .HasForeignKey(e => e.TypeID)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}
