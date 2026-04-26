using ExpenseManager.API.Dtos.Create;
using ExpenseManager.API.Models;
using ExpenseManager.API.Repositories.Interfaces;
using ExpenseManager.API.Services.Interfaces;

namespace ExpenseManager.API.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly IExpenseRepository _repository;

        public ExpenseService(IExpenseRepository repository)
        {
            _repository = repository;
        }
        public async Task<Expense> CreateAsync(CreateExpenseDto dto)
        {
            var expense = new Expense
            {
                Title = dto.Title,
                Amount = dto.Amount,
                Category = dto.Category,
                CreatedAt = DateTime.UtcNow
            };

            await _repository.AddAsync(expense);

            return expense;
        }
    }
}
