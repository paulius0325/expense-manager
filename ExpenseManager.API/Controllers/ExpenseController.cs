using ExpenseManager.API.Dtos.Create;
using ExpenseManager.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseManager.API.Controllers
{
    [ApiController]
    [Route("api/expense")]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseService _service;

        public ExpenseController(IExpenseService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> CreateExpense([FromBody] CreateExpenseDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetExpenses), result);
        }

        [HttpGet]
        public async Task<IActionResult> GetExpenses([FromQuery] string? category)
        {
            var expenses = await _service.GetAllAsync(category);
            return Ok(expenses);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
