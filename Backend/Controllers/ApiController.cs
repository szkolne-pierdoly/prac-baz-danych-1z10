using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/api/")]
public class ApiController : ControllerBase
{
    [HttpGet]
    [Route("get")]
    public IActionResult Get()
    {
        return Ok("Hello World");
    }
}
