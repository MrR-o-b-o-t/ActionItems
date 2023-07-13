using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ToDo.Controllers
{
    [Route("[Controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {

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

        [HttpDelete("{id}")]
        public IActionResult DeleteTodo(int id)
        {
            using (var dbContext = new YourDbContext(HttpContext.RequestServices.GetRequiredService<DbContextOptions<YourDbContext>>()))
            {
                var todo = dbContext.Todos.FirstOrDefault(t => t.Id == id);
                if (todo == null)
                {
                    return NotFound();
                }

                dbContext.Todos.Remove(todo);
                dbContext.SaveChanges();

                var todoList = dbContext.Todos.ToList();

                return Ok(todoList);
            }
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateCompleted(int id)
        {
            using (var dbContext = new YourDbContext(HttpContext.RequestServices.GetRequiredService<DbContextOptions<YourDbContext>>()))
            {
                var todo = dbContext.Todos.FirstOrDefault(t => t.Id == id);
                if (todo == null)
                {
                    return NotFound();
                }

                todo.Completed = !todo.Completed;
                dbContext.SaveChanges();


                return Ok("Success");
            }
        }


        [HttpGet]
        public IActionResult Get()
        {
            using (var dbContext = new YourDbContext(HttpContext.RequestServices.GetRequiredService<DbContextOptions<YourDbContext>>()))
            {
                var todos = dbContext.Todos.ToList();

                return Ok(todos);
            }
        }
    }
}
