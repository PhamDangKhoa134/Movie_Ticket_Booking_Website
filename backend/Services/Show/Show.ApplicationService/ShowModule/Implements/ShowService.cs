using Microsoft.Extensions.Logging;
using Shared.ApplicationService;
using Show.ApplicationService.Common;
using Show.ApplicationService.ShowModule.Abstracts;
using Show.Domain;
using Show.Dtos;
using Show.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Show.ApplicationService.ShowModule.Implements
{
    public class ShowService : ShowServiceBase, IShowService
    {
        public ShowService(ILogger<ShowService> logger, ShowDbContext dbContext) : base(logger, dbContext)
        {
        }

        public BookingDto CreateBooking(CreateBookingDto input)
        {
            //if (input == null)
            //{
            //    throw new ArgumentNullException(nameof(input), "Input không được để trống.");
            //}
            var exists = _dbContext.Bookings.FirstOrDefault(s => s.CreateOn == input.CreateOn && s.UserId == input.UserId);
            if (exists != null)
            {
                throw new InvalidOperationException("Booking này đã tồn tại!");
            }

            var booking = new ShoBooking
            {
                CreateOn = input.CreateOn,
                UserId = input.UserId,
                TotalPrice = input.TotalPrice,
            };
            _dbContext.Bookings.Add(booking);
            _dbContext.SaveChanges();

            return new BookingDto
            {
                Id = booking.Id,
                CreateOn = booking.CreateOn,
                UserId = booking.UserId,
                TotalPrice = booking.TotalPrice,
            };
        }

        public ShowDto CreateShow(CreateShowDto input)
        {
            //if (input == null)
            //{
            //    throw new ArgumentNullException(nameof(input), "Input không được để trống.");
            //}
            var exists = _dbContext.Shows.FirstOrDefault(s => s.StartTime == input.StartTime && s.CinemaId == input.CinemaId);
            if (exists != null)
            {
                throw new InvalidOperationException("Show này đã tồn tại!");
            }

            var show = new ShoShow
            {
                StartTime = input.StartTime,
                EndTime = input.EndTime,
                CinemaId = input.CinemaId,
                MovieId = input.MovieId,
                TimeFrameId = input.TimeFrameId,
            };
            _dbContext.Shows.Add(show);
            _dbContext.SaveChanges();

            return new ShowDto
            {
                Id = show.Id,
                StartTime = show.StartTime,
                EndTime= show.EndTime,
                CinemaId= show.CinemaId,
                MovieId= show.MovieId,
                TimeFrameId= show.TimeFrameId,
            };
        }

        public void DeleteBooking(int id)
        {
            var findBooking = FindBooking(id);
            _dbContext.Bookings.Remove(findBooking);
            _dbContext.SaveChanges();
        }

        public void DeleteShow(int id)
        {
            var findShow = FindShow(id);
            _dbContext.Shows.Remove(findShow);
            _dbContext.SaveChanges();
        }

        public ShoBooking FindBooking(int id)
        {
            var booking = _dbContext.Bookings.FirstOrDefault(p => p.Id == id);
            if (booking == null)
            {
                throw new KeyNotFoundException("Không tìm thấy đặt chỗ với ID đã cung cấp.");
            }
            return booking;
        }

        public ShoShow FindShow(int id)
        {
            var show = _dbContext.Shows.FirstOrDefault(p => p.Id == id);
            if (show == null)
            {
                throw new KeyNotFoundException("Không tìm thấy show với ID đã cung cấp.");
            }
            return show;
        }

        public List<BookingDto> GetAllBooking()
        {
            var result = _dbContext.Bookings.OrderByDescending(p => p.Id).ThenByDescending(p => p.Id).Select(p => new BookingDto
            {
                Id = p.Id,
                CreateOn = p.CreateOn,
                UserId = p.UserId,
                TotalPrice = p.TotalPrice,

            });
            return result.ToList();
        }

        public List<ShowDto> GetAllShow()
        {
            var result = _dbContext.Shows.OrderByDescending(p => p.Id).ThenByDescending(p => p.Id).Select(p => new ShowDto
            {
                Id = p.Id,
                StartTime = p.StartTime,
                EndTime = p.EndTime,
                CinemaId = p.CinemaId,
                MovieId = p.MovieId,
                TimeFrameId = p.TimeFrameId,

            });
            return result.ToList();
        }

        public BookingDto GetIdBooking(int id)
        {
            var findBooking = FindBooking(id);
            return new BookingDto
            {
                Id = findBooking.Id,
                CreateOn = findBooking.CreateOn,
                UserId= findBooking.UserId,
                TotalPrice = findBooking.TotalPrice,
            };
        }

        public ShowDto GetIdShow(int id)
        {
            var findShow = FindShow(id);
            return new ShowDto
            {
                Id = findShow.Id,
                StartTime = findShow.StartTime,
                EndTime = findShow.EndTime,
                CinemaId=findShow.CinemaId,
                MovieId=findShow.MovieId,
                TimeFrameId =findShow.TimeFrameId,
            };
        }

        public void UpdateBooking(UpdateBookingDto input)
        {
            var findBooking = FindBooking(input.Id);
            findBooking.CreateOn = input.CreateOn;
            findBooking.UserId = input.UserId;
            findBooking.TotalPrice = input.TotalPrice;
            _dbContext.SaveChanges();
        }

        public void UpdateShow(UpdateShowDto input)
        {
            var findShow = FindShow(input.Id);
            findShow.StartTime = input.StartTime;
            findShow.EndTime = input.EndTime;
            findShow.CinemaId = input.CinemaId;
            findShow.MovieId = input.MovieId;
            findShow.TimeFrameId = input.TimeFrameId;
            _dbContext.SaveChanges();
        }

        public List<ShowSeatDto> ShowCinema(int showId)
        {
            var result = _dbContext.ShowSeats.Where(p => p.ShowId == showId).OrderByDescending(p => p.Id).ThenByDescending(p => p.Id).Select(p => new ShowSeatDto
            {
                Id = p.Id,
                CinemaHSId = p.CinemaHSId,
                ShowId = p.ShowId,
                BookingId = p.BookingId,
                Price = p.Price,
            });
            return result.ToList();
        }

        public List<ShowDto> GetAllShowByIdMovie(int movieId)
        {
            var result = _dbContext.Shows.Where(p => p.MovieId == movieId).OrderByDescending(p => p.Id).ThenByDescending(p => p.Id).Select(p => new ShowDto
            {
                Id = p.Id,
                StartTime = p.StartTime,
                EndTime = p.EndTime,
                CinemaId = p.CinemaId,
                MovieId = p.MovieId,
                TimeFrameId = p.TimeFrameId,
            });
            return result.ToList();
        }

        public void UpdateShowCinema(UpdateShowCinemaDto input)
        {
            var findShowSeat = _dbContext.ShowSeats.FirstOrDefault(p => p.CinemaHSId == input.CinemaHSId);
            if (findShowSeat != null)
            {
                findShowSeat.BookingId = input.BookingId;
                _dbContext.Update(findShowSeat);
                _dbContext.SaveChanges();
            }
        }

        public PageResultDto<ShowDto> GetAllShow(FilterDto input)
        {
            var result = new PageResultDto<ShowDto>();

            var query = _dbContext.Shows.Where(e =>
                string.IsNullOrEmpty(input.Keyword)
                || e.StartTime.ToString().ToLower().Contains(input.Keyword.ToLower()) 
            );

            result.TotalShow = query.Count();

            query = query
                .OrderByDescending(s => s.StartTime) 
                .ThenByDescending(s => s.Id)        
                .Skip(input.Skip())                 
                .Take(input.PageSize);             

            result.Shows = query
                .Select(s => new ShowDto
                {
                    Id = s.Id,
                    StartTime = s.StartTime,
                    EndTime = s.EndTime,
                    CinemaId = s.CinemaId,
                    MovieId = s.MovieId,
                    TimeFrameId = s.TimeFrameId,
                })
                .ToList();

            return result;
        }

        private readonly string _smtpServer = "smtp.gmail.com"; // Máy chủ SMTP (ví dụ: Gmail)
        private readonly int _smtpPort = 587; // Cổng SMTP
        private readonly string _emailFrom = "phamdangkhoa134@gmail.com"; // Email của bạn
        private readonly string _emailPassword = "ksgtrzsovxgygcnw"; // Mật khẩu email

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            using (var client = new SmtpClient(_smtpServer, _smtpPort))
            {
                client.Credentials = new NetworkCredential(_emailFrom, _emailPassword);
                client.EnableSsl = true;

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_emailFrom),
                    Subject = subject,
                    Body = body,
                    //IsBodyHtml = true // Nếu nội dung email là HTML
                };
                mailMessage.To.Add(toEmail);

                await client.SendMailAsync(mailMessage);
            }
        }

    }
}
