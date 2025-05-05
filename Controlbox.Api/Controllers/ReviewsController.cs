using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Controlbox.Api.Data;
using Controlbox.Api.DTOs;
using Controlbox.Api.Models;
using System.Security.Claims;

namespace Controlbox.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ReviewsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReviewsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/reviews/book/5
        [AllowAnonymous]
        [HttpGet("book/{bookId}")]
        public async Task<IActionResult> GetReviewsForBook(int bookId)
        {
            var reviews = await _context.Reviews
                .Where(r => r.BookId == bookId)
                .Include(r => r.User)
                .Include(r => r.Book)
                .OrderByDescending(r => r.CreatedAt)
                .Select(r => new
                {
                    r.Id,
                    r.Rating,
                    r.Comment,
                    r.CreatedAt,
                    BookTitle = r.Book.Title,
                    User = new { r.User.Id, r.User.Username }
                })
                .ToListAsync();

            return Ok(reviews);
        }

        [Authorize]
        [HttpGet("mine")]
        public async Task<IActionResult> GetMyReviews()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized();

            var reviews = await _context.Reviews
                .Where(r => r.UserId == userId)
                .Include(r => r.Book)
                .OrderByDescending(r => r.CreatedAt)
                .Select(r => new
                {
                    r.Id,
                    r.Rating,
                    r.Comment,
                    r.CreatedAt,
                    BookTitle = r.Book.Title, // Mostrar el nombre del libro
                    BookId = r.Book.Id,
                })
                .ToListAsync();

            return Ok(reviews);
        }

        // PUT: api/reviews/{id}
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReview(int id, [FromBody] ReviewDto dto)
        {
            // Verificar si la reseña existe
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound(new { message = "Reseña no encontrada." });
            }

            // Verificar si el usuario está intentando actualizar su propia reseña
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId) || review.UserId != userId)
            {
                return Unauthorized();
            }

            // Actualizar los campos de la reseña
            review.Rating = dto.Rating;
            review.Comment = dto.Comment;
            

            // Guardar los cambios
            _context.Reviews.Update(review);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                review.Id,
                review.Rating,
                review.Comment
            });
        }


        // DELETE: api/reviews/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim, out int userId))
                return Unauthorized();

            var review = await _context.Reviews.FirstOrDefaultAsync(r => r.Id == id);

            if (review == null)
                return NotFound();

            if (review.UserId != userId)
                return Unauthorized();

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // POST: api/reviews
        [HttpPost]
        public async Task<IActionResult> CreateReview([FromBody] ReviewDto dto)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdClaim))
                return Unauthorized();

            if (!int.TryParse(userIdClaim, out int userId))
                return BadRequest(new { message = "ID de usuario inválido." });

            var book = await _context.Books.FindAsync(dto.BookId);
            if (book == null)
                return NotFound(new { message = "Libro no encontrado." });

            var review = new Review
            {
                UserId = userId, // ✅ ahora es int
                BookId = dto.BookId,
                Rating = dto.Rating,
                Comment = dto.Comment,
                CreatedAt = DateTime.UtcNow
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                review.Id,
                review.BookId,
                review.Rating,
                review.Comment,
                review.CreatedAt,
                review.UserId
            });
        }
    }
}
