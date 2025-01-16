using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMS.Hol.ApplicationService.Common
{
    public class VnPayRequest
    {
        public long OrderId { get; set; }
        public decimal Amount { get; set; }
        public string OrderDesc { get; set; }
        public string OrderType { get; set; } = "other";
        //public string Email { get; set; }
        //public string Seat { get; set; }
    }

}
