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
        public async Task<IActionResult> GetExpenses([FromQuery] string? category, [FromQuery] string? title)
        {
            var expenses = await _service.GetAllAsync(category, title);
            return Ok(expenses);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExpense(int id, [FromBody] CreateExpenseDto dto)
        {
            var result = await _service.UpdateAsync(id, dto);
            return Ok(result);
        }

    }
}
