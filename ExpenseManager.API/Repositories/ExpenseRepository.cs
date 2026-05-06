using ExpenseManager.API.Data;
using ExpenseManager.API.Models;
using ExpenseManager.API.Models.Enum;
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

        public async Task<IEnumerable<Expense>> GetAllAsync(string? category, string? title, string? sortBy)
        {
            IQueryable<Expense> query =
                _context.Expenses.AsQueryable();

            // CATEGORY FILTER
            if (!string.IsNullOrWhiteSpace(category))
            {
                if (Enum.TryParse<ExpenseCategory>(
                    category,
                    true,
                    out var parsed))
                {
                    query = query.Where(
                        e => e.Category == parsed);
                }
                else
                {
                    throw new ArgumentException(
                        "Invalid category");
                }
            }

            // TITLE SEARCH
            if (!string.IsNullOrWhiteSpace(title))
            {
                query = query.Where(e =>
                    EF.Functions.Like(
                        e.Title,
                        $"%{title}%"));
            }

            //SORTING
            var expenses = await query.ToListAsync();

            expenses = sortBy switch
            {
                "date_asc" =>
                    expenses.OrderBy(e => e.CreatedAt).ToList(),

                "date_desc" =>
                    expenses.OrderByDescending(e => e.CreatedAt).ToList(),

                "amount_asc" =>
                    expenses.OrderBy(e => e.Amount).ToList(),

                "amount_desc" =>
                    expenses.OrderByDescending(e => e.Amount).ToList(),

                _ =>
                    expenses.OrderByDescending(e => e.CreatedAt).ToList()
            };

            return expenses;
        }

        public async Task<Expense?> GetByIdAsync(int id)
        {
            return await _context.Expenses.FindAsync(id);
        }

        public async Task DeleteAsync(Expense expense)
        {
            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Expense expense)
        {
            _context.Expenses.Update(expense);
            await _context.SaveChangesAsync();
        }
    }
}
