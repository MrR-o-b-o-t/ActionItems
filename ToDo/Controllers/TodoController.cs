using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ToDo.Controllers
{
    [Route("[Controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private static List<Todo> todoList = new List<Todo>();

        [HttpPost]
        public IActionResult AddTodo([FromBody] Todo todo)
        {
            if (todo == null)
            {
                return BadRequest("Todo must contain at least one character/number. Try Again.");
            }

            using (var dbContext = new YourDbContext(HttpContext.RequestServices.GetRequiredService<DbContextOptions<YourDbContext>>()))
            {
                dbContext.Todos.Add(todo);
                dbContext.SaveChanges();
            }

            return Ok(todo);
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Successful");
        }
    }
}
