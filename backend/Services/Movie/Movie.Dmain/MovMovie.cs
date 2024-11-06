using Contstant.Database;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.Domain
{
    [Table(nameof(MovMovie), Schema = DbSchema.Movie)]
    public class MovMovie
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [MaxLength(255)]
        public string Name { get; set; }
        [MaxLength(50)]
        public string Country { get; set; }
        [MaxLength(511)]
        public string Description { get; set; }
        [MaxLength(100)]
        public string Category { get; set; }
        public int Duration { get; set; }
        [MaxLength(50)]
        public string Director { get; set; }
        [MaxLength (100)]
        public string Actor { get; set; }
        public int CensorId { get; set; }
        public string MovieImage {  get; set; }
        public string BackgroundImage { get; set; }

    }
}
