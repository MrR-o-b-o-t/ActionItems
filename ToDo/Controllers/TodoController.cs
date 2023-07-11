using Microsoft.AspNetCore.Mvc;

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

            todo.Id = todoList.Count + 1;
            todoList.Add(todo);

            return Ok(todo);
        }

        [HttpGet]
        public IActionResult GetTodo()
        {
            return Ok("Successful");
        }
    }
}
