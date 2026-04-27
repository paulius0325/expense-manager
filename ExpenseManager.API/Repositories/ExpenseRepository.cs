using ExpenseManager.API.Data;
using ExpenseManager.API.Models;
using ExpenseManager.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExpenseManager.API.Repositories
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly ExpenseManagerDbContext _context;

        public ExpenseRepository(ExpenseManagerDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Expense expense)
        {
            await _context.Expenses.AddAsync(expense);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Expense>> GetAllAsync()
        {
            return await _context.Expenses
                .OrderByDescending(e => e.CreatedAt)
                .ToListAsync();
        }
    }
}
