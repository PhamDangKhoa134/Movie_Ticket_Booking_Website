using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Show.Dtos
{
    public class ShowSeatDto
    {
        public int Id { get; set; }
        public int CinemaHSId { get; set; }
        public int ShowId { get; set; }
        public int BookingId { get; set; }
        public double Price { get; set; }
    }
}
