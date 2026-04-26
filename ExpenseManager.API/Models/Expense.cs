namespace ExpenseManager.API.Models
{
    public class Expense
    {
        public int Id { get; set; }

        public decimal Amount { get; set; }

        public string Category { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
