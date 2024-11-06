using Contstant.Database;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auth.Domain
{
    [Table(nameof(AuthUser), Schema = DbSchema.Auth)]
    public class AuthUser
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [MaxLength(50)]
        public string LastName { get; set; }

        [MaxLength(50)]
        public string FirstName { get; set; }
        [MaxLength(12)]
        public string Phone { get; set; }
        [MaxLength(100)]
        public string Email { get; set; }
        [MaxLength(255)]
        public string Address { get; set; }
        [MaxLength(255)]
        public string Password { get; set; }
        public int RoleId { get; set; }

    }
}
