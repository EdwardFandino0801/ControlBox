using System.ComponentModel.DataAnnotations;

namespace Controlbox.Api.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        [Required]
        [MaxLength(200)]
        public string Author { get; set; }

        [MaxLength(500)]
        public string? Summary { get; set; }

        [Required]
        public string Category { get; set; }

        // Relación con las reseñas (un libro puede tener muchas reseñas)
        public List<Review>? Reviews { get; set; } // Relación uno a muchos con las reseñas
    }
}
