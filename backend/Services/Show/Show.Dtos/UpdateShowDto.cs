using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Show.Dtos
{
    public class UpdateShowDto : CreateShowDto
    {
        public int Id { get; set; }
    }
}
