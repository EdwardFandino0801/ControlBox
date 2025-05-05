using System;

namespace Controlbox.Api.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int UserId { get; set; } // La clave foránea
        public int BookId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Relación con User (navegación inversa)
        public User User { get; set; } = null!;

        // Relación con Book (navegación)
        public Book Book { get; set; } = null!;
    }
}
