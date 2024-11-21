using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Show.Dtos
{
    public class BookingDto
    {
        public int Id { get; set; }
        public DateTime CreateOn { get; set; }
        public int UserId { get; set; }
        public double TotalPrice { get; set; }
    }
}
