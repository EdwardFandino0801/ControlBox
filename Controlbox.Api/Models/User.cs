using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Controlbox.Api.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Username { get; set; }

        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Relación con Reviews
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}
