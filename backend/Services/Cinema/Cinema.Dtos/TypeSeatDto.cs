using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cinema.Dtos
{
    public class TypeSeatDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public double HolidayPrice { get; set; }
    }
}
