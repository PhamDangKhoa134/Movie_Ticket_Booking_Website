using Microsoft.EntityFrameworkCore;
using Show.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Show.Infrastructure
{
    public class ShowDbContext : DbContext
    {
        public DbSet<ShoShow> Shows { get; set; }
        public DbSet<ShoShowSeat> ShowSeats { get; set; }
        public DbSet<ShoTimeFrame> TimeFrames { get; set; }
        public DbSet<ShoBooking> Bookings { get; set; }

        public ShowDbContext(DbContextOptions<ShowDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<ShoShow>()
                .HasOne<ShoTimeFrame>()
                .WithMany()
                .HasForeignKey(e => e.TimeFrameId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder
                .Entity<ShoShowSeat>()
                .HasOne<ShoShow>()
                .WithMany()
                .HasForeignKey(e => e.ShowId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder
                .Entity<ShoShowSeat>()
                .HasOne<ShoBooking>()
                .WithMany()
                .HasForeignKey(e => e.BookingId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}
