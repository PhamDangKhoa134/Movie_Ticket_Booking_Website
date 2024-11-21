using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auth.Dtos
{
    public class UpdateUserDto
    {
        public int Id { get; set; }
        private string _lastname;
        [Required(ErrorMessage = "Họ không được bỏ trống")]
        public string LastName
        {
            get => _lastname;
            set => _lastname = value?.Trim();
        }

        private string _fistname;
        [Required(ErrorMessage = "Tên không được bỏ trống")]
        public string FistName
        {
            get => _fistname;
            set => _fistname = value?.Trim();
        }
        public string Address { get; set; }
    }
}
