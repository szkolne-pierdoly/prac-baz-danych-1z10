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
    public async Task<IActionResult> CreateGame([FromBody] CreateGameRequest request)
    {
        var result = await _gameService.CreateGame(request);
        if (!result.IsSuccess) {
            return StatusCode(result.HttpStatusCode ?? 400, new {
                status = result.Status,
                message = result.Message ?? "Internal server error"
            });
        }
        return Ok(new {
            status = result.Status,
            message = result.Message ?? "Game created successfully",
            newGame = result.Game
        });
    }

    [HttpPost("{id}/duplicate")]
    public async Task<IActionResult> DuplicateGame(int id)
    {
        var result = await _gameService.DuplicateGame(id);
        if (!result.IsSuccess) {
            return StatusCode(result.HttpStatusCode ?? 400, new {
                status = result.Status,
                message = result.Message ?? "Internal server error"
            });
        }
        return Ok(new {
            status = result.Status,
            message = result.Message ?? "Game duplicated successfully",
            newGameId = result.GameId
        });
    }

    [HttpPost("{id}/start")]
    public async Task<IActionResult> StartGame(int id)
    {
        var result = await _gameService.StartGame(id);
        if (!result.IsSuccess) {
            return StatusCode(result.HttpStatusCode ?? 400, new {
                status = result.Status,
                message = result.Message ?? "Internal server error"
            });
        }
        return Ok(new {
            status = result.Status,
            message = result.Message ?? "Game started successfully",
            gameToken = result.GameToken
        });
    }

    [HttpGet]
    public async Task<IActionResult> GetAllGames([FromQuery] bool includePlayers = false, [FromQuery] bool includeActions = false, [FromQuery] bool includeSequence = false, [FromQuery] int? limit = null, [FromQuery] int? offset = null, [FromQuery] string? search = null)
    {
        var result = await _gameService.GetAllGames(includePlayers, includeActions, includeSequence, limit, offset, search);
        if (!result.IsSuccess) {
            return StatusCode(result.HttpStatusCode ?? 400, result);
        }
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetGameById(int id)
    {
        var result = await _gameService.GetGameById(id);
        if (!result.IsSuccess) {
            return StatusCode(result.HttpStatusCode ?? 400, result);
        }
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateGame(int id, [FromBody] UpdateGameRequest request)
    {
        var result = await _gameService.UpdateGame(id, request);
        if (!result.IsSuccess) {
            return StatusCode(result.HttpStatusCode ?? 400, result);
        }
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGame(int id)
    {
        var result = await _gameService.DeleteGame(id);
        if (!result.IsSuccess) {
            return StatusCode(result.HttpStatusCode ?? 400, result);
        }
        return Ok(result);
    }
}
