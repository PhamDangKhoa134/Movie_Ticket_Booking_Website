using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cinema.Dtos
{
    public class UpdateTypeSeatDto : CreateTypeSeatDto
    {
        public int Id { get; set; }
    }
}
