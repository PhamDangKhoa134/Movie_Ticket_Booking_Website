using Contstant.Database;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cinema.Domain
{
    [Table(nameof(CinCinemaHallSeat), Schema = DbSchema.Cinema)]
    public class CinCinemaHallSeat
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int SeatRow {  get; set; }
        public int SeatColumn { get; set; }
        public int TypeID { get; set; }
        public int CinemaID { get; set; }
    }
}
