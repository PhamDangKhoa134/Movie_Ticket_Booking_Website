using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cinema.Dtos
{
    public class CreateTypeSeatDto
    {
        private string _name;
        [Required(ErrorMessage = "Tên không được bỏ trống")]
        public string Name
        {
            get => _name;
            set => _name = value?.Trim();
        }
        public double Price { get; set; }
        public double HolidayPrice { get; set; }
    }
    
}
