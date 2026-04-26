using ExpenseManager.API.Dtos.Create;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : ControllerBase
    {
        [HttpPost]
        public IActionResult CreateExpense([FromBody] CreateExpenseDto dto)
        {
            
            return Ok(dto);
        }
    }
}
