using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auth.ApplicationService.Common
{
    public class PageResultDto<T>
    {
        public IEnumerable<T> Auths { get; set; }
        public int TotalAuth { get; set; }
    }
}
