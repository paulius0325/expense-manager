using ExpenseManager.API.Dtos;
using ExpenseManager.API.Dtos.Create;
using ExpenseManager.API.Models;
using ExpenseManager.API.Models.Enum;
using ExpenseManager.API.Repositories.Interfaces;
using ExpenseManager.API.Services.Interfaces;

namespace ExpenseManager.API.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly IExpenseRepository _repository;
        private readonly ILogger<ExpenseService> _logger;

        public ExpenseService(
            IExpenseRepository repository,
            ILogger<ExpenseService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task<Expense> CreateAsync(CreateExpenseDto dto)
        {
            _logger.LogInformation("Creating expense request received");

            if (dto.Amount <= 0)
                throw new ArgumentException("Amount must be greater than zero");

            if (dto.Amount > 10000)
                throw new ArgumentException("Amount too large");

            var title = dto.Title?.Trim();

            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("Title is required");

            
            if (!Enum.IsDefined(typeof(ExpenseCategory), dto.Category))
                throw new ArgumentException("Invalid category");

            var expense = new Expense
            {
                Title = title,
                Amount = dto.Amount,
                Category = dto.Category,
                CreatedAt = DateTime.UtcNow
            };

            await _repository.AddAsync(expense);

            _logger.LogInformation("Expense created successfully with Title: {Title}", expense.Title);

            return expense;
        }

        public async Task<IEnumerable<ExpenseDto>> GetAllAsync(string? category, string? title, string? sortBy)
        {
            var expenses = await _repository.GetAllAsync(category, title, sortBy);

            return expenses.Select(e => new ExpenseDto
            {
                Id = e.Id,
                Title = e.Title,
                Amount = e.Amount,
                Category = e.Category.ToString(),
                CreatedAt = e.CreatedAt
            });
        }

        public async Task DeleteAsync(int id)
        {
            var expense = await _repository.GetByIdAsync(id);

            if (expense == null)
                throw new KeyNotFoundException("Expense not found");

            await _repository.DeleteAsync(expense);
        }

        public async Task<ExpenseDto> UpdateAsync(int id, CreateExpenseDto dto)
        {
            var expense = await _repository.GetByIdAsync(id);

            if (expense == null)
                throw new KeyNotFoundException("Expense not found");

            if (dto.Amount <= 0)
                throw new ArgumentException("Amount must be greater than zero");

            if (dto.Amount > 10000)
                throw new ArgumentException("Amount too large");

            var title = dto.Title?.Trim();

            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("Title is required");

            if (!System.Text.RegularExpressions.Regex.IsMatch(title, @"^[a-zA-Z\s]+$"))
                throw new ArgumentException("Title must contain only letters");

            if (!Enum.IsDefined(typeof(ExpenseCategory), dto.Category))
                throw new ArgumentException("Invalid category");

            expense.Title = title;
            expense.Amount = dto.Amount;
            expense.Category = dto.Category;

            await _repository.UpdateAsync(expense);

            return new ExpenseDto
            {
                Id = expense.Id,
                Title = expense.Title,
                Amount = expense.Amount,
                Category = expense.Category.ToString(),
                CreatedAt = expense.CreatedAt
            };
        }


    }
}
