using Contstant.Database;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Show.Domain
{
    [Table(nameof(ShoShow), Schema = DbSchema.Show)]
    public class ShoShow
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int CinemaId { get; set; }
        public int MovieId { get; set; }
        public int TimeFrameId { get; set; }
    }
}
