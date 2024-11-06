using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.ApplicationService.Common
{
    public class PageResultDto<T>
    {
        public IEnumerable<T> Movies { get; set; }
        public int TotalMovie { get; set; }
    }
}
