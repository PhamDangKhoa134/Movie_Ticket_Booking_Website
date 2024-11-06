using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.Dtos
{
    public class CreateMovieDto
    {
        private string _name;
        [Required(ErrorMessage = "Tên không được bỏ trống")]
        public string Name
        {
            get => _name;
            set => _name = value?.Trim();
        }

        private string _country;
        [Required(ErrorMessage = "Quốc gia không được bỏ trống")]
        public string Country
        {
            get => _country;
            set => _country = value?.Trim();
        }

        private string _category;
        [Required(ErrorMessage = "Thể loại không được bỏ trống")]
        public string Category
        {
            get => _category;
            set => _category = value?.Trim();
        }

        public int Duration { get; set; }

        private string _actor;
        [Required(ErrorMessage = "Diễn viên không được bỏ trống")]
        public string Actor
        {
            get => _actor;
            set => _actor = value?.Trim();
        }

        private string _director;
        [Required(ErrorMessage = "Đạo diễn không được bỏ trống")]
        public string Director
        {
            get => _director;
            set => _director = value?.Trim();
        }

        private string _description;
        [Required(ErrorMessage = "Chi tiết phim không được bỏ trống")]
        public string Description
        {
            get => _description;
            set => _description = value?.Trim();
        }

        public int CensorId { get; set; }

        public IFormFile MovieImg {  get; set; }
        public IFormFile BackgroundImg { get; set; }
    }
}
