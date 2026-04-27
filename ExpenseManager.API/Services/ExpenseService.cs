using ExpenseManager.API.Dtos;
using ExpenseManager.API.Dtos.Create;
using ExpenseManager.API.Models;
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
            {
                _logger.LogWarning("Invalid amount: {Amount}", dto.Amount);
                throw new ArgumentException("Amount must be greater than zero");
            }

            if (dto.Amount > 10000)
            {
                _logger.LogWarning("Amount too large: {Amount}", dto.Amount);
                throw new ArgumentException("Amount too large");
            }

            var title = dto.Title?.Trim();

            if (string.IsNullOrWhiteSpace(title))
            {
                _logger.LogWarning("Title is empty or null");
                throw new ArgumentException("Title is required");
            }

            var expense = new Expense
            {
                Title = title,
                Amount = dto.Amount,
                Category = dto.Category,
                CreatedAt = DateTime.UtcNow
            };

            _logger.LogInformation("Saving expense to database: {Title}", expense.Title);

            await _repository.AddAsync(expense);

            _logger.LogInformation("Expense created successfully with Title: {Title}", expense.Title);

            return expense;
        }

        public async Task<IEnumerable<ExpenseDto>> GetAllAsync()
        {
            var expenses = await _repository.GetAllAsync();

            return expenses.Select(e => new ExpenseDto
            {
                Id = e.Id,
                Title = e.Title,
                Amount = e.Amount,
                Category = e.Category.ToString(),
                CreatedAt = e.CreatedAt
            });
        }
    }
}
