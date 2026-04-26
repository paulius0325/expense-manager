using ExpenseManager.API.Models.Enum;
using System.ComponentModel.DataAnnotations;

namespace ExpenseManager.API.Dtos.Create
{
    public class CreateExpenseDto
    {
            [Required]
            [StringLength(100)]
            public string Title { get; set; } = string.Empty;

            [Range(0.01, double.MaxValue)]
            public decimal Amount { get; set; }

            [Required]
            public ExpenseCategory Category { get; set; }
        
    }
}
