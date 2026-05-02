using ExpenseManager.API.Models;

namespace ExpenseManager.API.Repositories.Interfaces
{
    public interface IExpenseRepository
    {
        Task AddAsync(Expense expense);
        Task<IEnumerable<Expense>> GetAllAsync(string? category);
        Task<Expense?> GetByIdAsync(int id);
        Task DeleteAsync(Expense expense);
        Task UpdateAsync(Expense expense);
    }
}
