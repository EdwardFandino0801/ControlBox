using Microsoft.AspNetCore.Mvc;
using Controlbox.Api.Models;
using Controlbox.Api.Data;
using Microsoft.EntityFrameworkCore;
using Controlbox.Api.DTOs;

namespace Controlbox.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class BooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BooksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookDto>>> GetBooks([FromQuery] string? search)
        {
            var query = _context.Books.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(b =>
                    b.Title.Contains(search) ||
                    b.Author.Contains(search) ||
                    b.Category.Contains(search));
            }

            var books = await query
                .Select(b => new BookDto
                {
                    Id = b.Id,
                    Title = b.Title,
                    Author = b.Author,
                    Category = b.Category,
                    Summary = b.Summary
                })
                .ToListAsync();

            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookById(int id)
        {
            var book = await _context.Books
                .Include(b => b.Reviews)
                .ThenInclude(r => r.User)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (book == null) return NotFound();

            return Ok(new
            {
                book.Id,
                book.Title,
                book.Author,
                book.Category,
                book.Summary,
                Reviews = book.Reviews.Select(r => new {
                    r.Id,
                    r.Comment,
                    r.Rating,
                    User = new { r.User.Id, r.User.Username }
                })
            });
        }
    }
}
