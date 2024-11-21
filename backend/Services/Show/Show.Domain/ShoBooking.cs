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
    [Table(nameof(ShoBooking), Schema = DbSchema.Show)]
    public class ShoBooking
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTime CreateOn { get; set; }
        public int UserId { get; set; }
        public double TotalPrice { get; set; }
    }
}
