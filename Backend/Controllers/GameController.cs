using Backend.Data.Models;
using Backend.Interface.Services;
using Backend.Models.Contracts.Request;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/games")]
[ApiController]
public class GameController : ControllerBase
{
    private readonly IGameService _gameService;

    public GameController(IGameService gameService)
    {
        _gameService = gameService;
    }

    [HttpPost]
    public async Task<IActionResult> StartGame([FromBody] StartGameRequest request)
    {
        var result = await _gameService.StartGame(request);
        if (!result.IsSuccess) {
            return StatusCode(result.HttpStatusCode ?? 400, result);
        }
        return Ok(result);
    }
}
