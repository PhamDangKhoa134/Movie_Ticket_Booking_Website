using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Show.Dtos
{
    public class ShowDto
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int CinemaId { get; set; }
        public int MovieId { get; set; }
        public int TimeFrameId { get; set; }
    }
}
