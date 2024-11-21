using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Show.ApplicationService.Common
{
    public class PageResultDto<T>
    {
        public IEnumerable<T> Shows { get; set; }
        public int TotalShow { get; set; }
    }
}
