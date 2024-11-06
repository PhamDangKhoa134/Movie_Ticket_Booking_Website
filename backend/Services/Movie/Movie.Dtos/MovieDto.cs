using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.Dtos
{
    public class MovieDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public int Duration { get; set; }
        public string Director { get; set; }
        public string Actor { get; set; }
        public int CensorId { get; set; }
        public string MovieImage { get; set; }
        public string BackgroundImage { get; set; }
    }
}
