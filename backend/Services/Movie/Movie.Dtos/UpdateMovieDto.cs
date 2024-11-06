using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.Dtos
{
    public class UpdateMovieDto : CreateMovieDto
    {
        public int Id { get; set; }
    }
}
