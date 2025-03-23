using Backend.Data.Models;
using Backend.Interface.Services;
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
    public async Task<IActionResult> CreateGame([FromBody] Game game)
    {
        var result = await _gameService.CreateGame(game);
        return Ok(result);
    }
}
