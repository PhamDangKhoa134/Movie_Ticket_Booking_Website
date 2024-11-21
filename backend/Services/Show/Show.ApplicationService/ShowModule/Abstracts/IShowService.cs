using Shared.ApplicationService;
using Show.ApplicationService.Common;
using Show.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Show.ApplicationService.ShowModule.Abstracts
{
    public interface IShowService
    {
        BookingDto CreateBooking(CreateBookingDto input);
        ShowDto CreateShow(CreateShowDto input);
        void DeleteBooking(int id);
        void DeleteShow(int id);
        List<BookingDto> GetAllBooking();
        List<ShowDto> GetAllShow();
        List<ShowDto> GetAllShowByIdMovie(int id);
        BookingDto GetIdBooking(int id);
        ShowDto GetIdShow(int id);
        List<ShowSeatDto> ShowCinema(int id);
        void UpdateBooking(UpdateBookingDto input);
        void UpdateShow(UpdateShowDto input);
        void UpdateShowCinema(UpdateShowCinemaDto input);
        PageResultDto<ShowDto> GetAllShow(FilterDto input);
        Task SendEmailAsync(string toEmail, string subject, string body);
    }
}
