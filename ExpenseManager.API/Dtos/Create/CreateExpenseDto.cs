using System.ComponentModel.DataAnnotations;

namespace ExpenseManager.API.Dtos.Create
{
    public class CreateExpenseDto
    {
            public string Title { get; set; } = string.Empty;
            public decimal Amount { get; set; }

            [Required]
            public string Category { get; set; } = string.Empty;
        
    }
}
