using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cinema.ApplicationService.Common
{
    public class PageResultDto<T>
    {
        public IEnumerable<T> Cinemas { get; set; }
        public int TotalCinema { get; set; }
    }

}
