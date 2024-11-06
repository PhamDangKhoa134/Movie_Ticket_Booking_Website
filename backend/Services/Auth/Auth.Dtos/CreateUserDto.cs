using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Auth.Dtos
{
    public class CreateUserDto
    {
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

        private string _phone;
        [Required(ErrorMessage = "Số điện thoại không được bỏ trống")]
        public string Phone
        {
            get => _phone;
            set => _phone = value?.Trim();
        }

        private string _email;
        [Required(ErrorMessage = "email không được bỏ trống")]
        public string Email
        {
            get => _email;
            set => _email = value?.Trim();
        }

        private string _password;
        [Required(ErrorMessage = "password không được bỏ trống")]
        public string Password
        {
            get => _password;
            set => _password = value?.Trim();
        }
        public string Address { get; set; }
        public int RoleId { get; set; }
    }
}
