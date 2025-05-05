using Controlbox.Api.Data;
using Controlbox.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Controlbox.Api.Services
{
    public class ReviewService
    {
        private readonly ApplicationDbContext _context;

        public ReviewService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Review>> GetAllReviewsAsync()
        {
            return await _context.Reviews.Include(r => r.User).Include(r => r.Book).ToListAsync();
        }

        // Puedes agregar aquí más métodos como AddReviewAsync, GetByBookIdAsync, etc.
    }
}