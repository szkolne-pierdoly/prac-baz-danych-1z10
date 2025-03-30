
using Backend.Interface.Services;
using Backend.Models.Contracts.Request;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

public class GameplayController : ControllerBase
{
    private readonly IGameplayService _gameplayService;

    public GameplayController(IGameplayService gameplayService)
    {
        _gameplayService = gameplayService;
    }

    [HttpPost("token/validate")]
    public async Task<IActionResult> ValidateGameToken([FromBody] ValidateGameTokenRequest request)
    {
        var result = await _gameplayService.ValidateGameToken(request.GameToken);
        return Ok(result);
    }
}
