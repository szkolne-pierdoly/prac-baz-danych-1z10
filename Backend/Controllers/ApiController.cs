using Backend.Interface.Services;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/api/")]
public class ApiController : ControllerBase
{
    private readonly IApiService _apiService;

    public ApiController(IApiService apiService)
    {
        _apiService = apiService;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Hello World");
    }

    [HttpGet("/api/stats")]
    public async Task<IActionResult> GetStats()
    {
        var stats = await _apiService.GetStats();
        return Ok(stats);
    }
}
