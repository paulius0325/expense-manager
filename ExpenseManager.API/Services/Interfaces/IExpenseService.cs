using ExpenseManager.API.Dtos;
using ExpenseManager.API.Dtos.Create;
using ExpenseManager.API.Models;

namespace ExpenseManager.API.Services.Interfaces
{
    public interface IExpenseService
    {
        Task<Expense> CreateAsync(CreateExpenseDto dto);
        Task<IEnumerable<ExpenseDto>> GetAllAsync();
        Task DeleteAsync(int id);
    }
}
