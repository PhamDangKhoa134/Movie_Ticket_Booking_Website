using Cinema.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cinema.ApplicationService.CinemaModule.Abstracts
{
    public interface ICinemaService
    {
        TypeSeatDto CreateTypeSeat(CreateTypeSeatDto input);
        void DeleteTypeSeat(int id);
        void UpdateTypeSeat(UpdateTypeSeatDto input);
        List<TypeSeatDto> GetAllTypeSeat();
        TypeSeatDto GetIdTypeSeat(int id);
    }
}
