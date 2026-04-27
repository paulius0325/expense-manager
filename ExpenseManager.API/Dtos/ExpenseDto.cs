using ExpenseManager.API.Models.Enum;

namespace ExpenseManager.API.Dtos
{
    public class ExpenseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Category { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
