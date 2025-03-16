
using Backend.Interface.Services;
using Backend.Models.Contracts.Request;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/players")]
[ApiController]
public class PlayerController : ControllerBase
{
    private readonly IPlayerService _playerService;

    public PlayerController(IPlayerService playerService)
    {
        _playerService = playerService;
    }

    [HttpPost]
    public async Task<IActionResult> CreatePlayer([FromBody] CreatePlayerRequest request)
    {
        var result = await _playerService.CreatePlayer(request);
        if (result.IsSuccess)
        {
            return Ok(new
            {
                result.Status,
                Message = result.Message ?? "Player created successfully",
                Player = result.Player
            });
        }
        else
        {
            return StatusCode(result.HttpStatusCode ?? 500, new
            {
                result.Status,
                Message = result.Message ?? "Something went wrong, please try again later."
            });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllPlayers()
    {
        var result = await _playerService.GetAllPlayers();
        if (result.IsSuccess)
        {
            return Ok(new
            {
                result.Status,
                Message = result.Message ?? "Players fetched successfully",
                Players = result.Players
            });
        }
        else
        {
            return StatusCode(result.HttpStatusCode ?? 500, new
            {
                result.Status,
                Message = result.Message ?? "Something went wrong, please try again later."
            });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPlayerById(int id)
    {
        var result = await _playerService.GetPlayerById(id);
        if (result.IsSuccess)
        {
            return Ok(new
            {
                result.Status,
                Message = result.Message ?? "Player fetched successfully",
                Player = result.Player
            });
        }
        else
        {
            return StatusCode(result.HttpStatusCode ?? 500, new
            {
                result.Status,
                Message = result.Message ?? "Something went wrong, please try again later."
            });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePlayer(int id, [FromBody] UpdatePlayerRequest request)
    {
        var result = await _playerService.UpdatePlayer(request, id);
        if (result.IsSuccess)
        {
            return Ok(new
            {
                result.Status,
                Message = result.Message ?? "Player updated successfully"
            });
        }
        else
        {
            return StatusCode(result.HttpStatusCode ?? 500, new
            {
                result.Status,
                Message = result.Message ?? "Something went wrong, please try again later."
            });
        }
    }

    [HttpDelete("{ids}")]
    public async Task<IActionResult> DeletePlayer(string ids)
    {
        IActionResult result;
        if (ids.Contains(','))
        {
            var multiResult = await _playerService.DeleteMultiplePlayers(ids.Split(',').Select(int.Parse).ToArray());
            if (multiResult.IsSuccess)
            {
                result = Ok(new
                {
                    Status = multiResult.Status,
                    Message = multiResult.Message ?? "Players deleted successfully"
                });
            }
            else
            {
                result = StatusCode(multiResult.HttpStatusCode ?? 500, new
                {
                    Status = multiResult.Status,
                    Message = multiResult.Message ?? "Something went wrong, please try again later."
                });
            }
        }
        else
        {
            if (int.TryParse(ids, out int id))
            {
                var singleResult = await _playerService.DeletePlayer(id);
                if (singleResult.IsSuccess)
                {
                    result = Ok(new
                    {
                        Status = singleResult.Status,
                        Message = singleResult.Message ?? "Player deleted successfully"
                    });
                }
                else
                {
                    if (singleResult.HttpStatusCode == 404)
                    {
                        result = StatusCode(singleResult.HttpStatusCode, new
                        {
                            Status = singleResult.Status,
                            Message = singleResult.Message ?? "Player not found"
                        });
                    }
                    else
                    {
                        result = StatusCode(singleResult.HttpStatusCode ?? 500, new
                    {
                        Status = singleResult.Status,
            }
            else
            {
                result = StatusCode(400, new
                {
                    Status = "ERROR",
                    Message = "Invalid player ID format."
                });
            }
        }
        return result;
    }
}
