using ExpenseManager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseManager.API.Data
{
    public class ExpenseManagerDbContext : DbContext
    {
        public ExpenseManagerDbContext(DbContextOptions<ExpenseManagerDbContext> options)
       : base(options)
        {
        }

        public DbSet<Expense> Expenses => Set<Expense>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Expense>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Amount)
                      .IsRequired();

                entity.Property(e => e.Category)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(e => e.CreatedAt)
                      .IsRequired();
            });
        }
    }
}
