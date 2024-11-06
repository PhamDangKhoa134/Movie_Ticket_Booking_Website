using Cinema.ApplicationService.CinemaModule.Abstracts;
using Cinema.ApplicationService.Common;
using Cinema.Domain;
using Cinema.Dtos;
using Cinema.Infrastructure;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cinema.ApplicationService.CinemaModule.Implements
{
    public class CinemaService : CinemaServiceBase, ICinemaService
    {
        public CinemaService(ILogger<CinemaService> logger, CinemaDbContext dbContext) : base(logger, dbContext)
        {
        }

        public TypeSeatDto CreateTypeSeat(CreateTypeSeatDto input)
        {
            var existTypeSeat = _dbContext.TypeSeats.FirstOrDefault(s => s.Name.ToLower() == input.Name.ToLower());
            if (existTypeSeat == null)
            {
                var typeSeat = new CinTypeSeat()
                {
                    Name = input.Name,
                    Price = input.Price,
                    HolidayPrice = input.HolidayPrice,
                };
                _dbContext.TypeSeats.Add(typeSeat);
                _dbContext.SaveChanges();
                return new TypeSeatDto
                {
                    Id = typeSeat.Id,
                    Name = input.Name,
                    Price = input.Price,
                    HolidayPrice = input.HolidayPrice,
                };
            }
            else
            {
                throw new Exception("Loai ghe nay da co!!!");
            }
        }

        public void DeleteTypeSeat(int id)
        {
            var findTypeSeat = FindTypeSeat(id);
            _dbContext.TypeSeats.Remove(findTypeSeat);
            _dbContext.SaveChanges();
        }

        public CinTypeSeat FindTypeSeat(int id)
        {
            var typeSeat = _dbContext.TypeSeats.FirstOrDefault(p => p.Id == id);
            if (typeSeat == null)
            {
                throw new Exception("Không tìm thấy sản phẩm cần tìm");
            }
            return typeSeat;
        }

        public void UpdateTypeSeat(UpdateTypeSeatDto input)
        {
            var findTypeSeat = FindTypeSeat(input.Id);
            findTypeSeat.Name = input.Name;
            findTypeSeat.Price = input.Price;
            findTypeSeat.HolidayPrice = input.HolidayPrice;
            _dbContext.SaveChanges();
        }

        List<TypeSeatDto> ICinemaService.GetAllTypeSeat()
        {
            var result = _dbContext.TypeSeats.OrderByDescending(p => p.Id).ThenByDescending(p => p.Id).Select(p => new TypeSeatDto
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                HolidayPrice = p.HolidayPrice,
            });
            return result.ToList();
        }

        TypeSeatDto ICinemaService.GetIdTypeSeat(int id)
        {
            var findTypeSeat = FindTypeSeat(id);
            return new TypeSeatDto
            {
                Id = findTypeSeat.Id,
                Name = findTypeSeat.Name,
                Price = findTypeSeat.Price,
                HolidayPrice= findTypeSeat.HolidayPrice,
            };
        }
    }
}
