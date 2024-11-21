using Contstant.Database;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Show.Domain
{
    [Table(nameof(ShoShowSeat), Schema = DbSchema.Show)]
    public class ShoShowSeat
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int CinemaHSId { get; set; }
        public int ShowId { get; set; }
        public int BookingId { get; set; }
        public double Price { get; set; }
    }
}
