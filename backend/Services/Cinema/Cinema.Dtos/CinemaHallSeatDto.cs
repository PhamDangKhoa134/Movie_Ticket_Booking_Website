using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cinema.Dtos
{
    public class CinemaHallSeatDto
    {
        public int Id { get; set; }
        public int SeatRow { get; set; }
        public int SeatColumn { get; set; }
        public int TypeID { get; set; }
        public int CinemaID { get; set; }
    }
}
