using Backend.Interface.Services;
using Backend.Models.Contracts.Request;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/gameplay")]
[ApiController]
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
        return Ok(new {
            status = result.Status,
            message = result.Message,
            isValid = result.IsValid
        });
    }

    [HttpGet("all-data")]
    public async Task<IActionResult> GetAllData([FromQuery] string gameToken)
    {
        var result = await _gameplayService.GetAllData(gameToken);
        return Ok(new {
            status = result.Status,
            message = result.Message,
            data = new {
                name = result.Name,
                players = result.Players?.Select(p => new {
                    id = p.Id,
                    name = p.Name,
                    color = p.Color,
                    points = p.Points,
                    lives = p.Lives,
                    seat = p.Seat
                }).ToList(),
                actions = result.Actions?.Select(a => new {
                    id = a.Id,
                    type = a.Type,
                    createdAt = a.CreatedAt,
                    pointsGained = a.PointsGained,
                    gameId = a.GameId,
                    gamePlayerId = a.GamePlayerId,
                    sequencesQuestionId = a.SequencesQuestionId,
                    answerCorrect = a.AnswerCorrect
                }).ToList(),
                sequence = result.Sequence,
                currentQuestion = result.CurrentQuestion,
                currentPlayer = result.CurrentPlayer,
                currentSequencePart = result.CurrentSequencePart,
                createdAt = result.CreatedAt,
                updatedAt = result.UpdatedAt,
                startTime = result.StartTime,
                endTime = result.EndTime,
            }
        });
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats([FromQuery] string gameToken)
    {
        var result = await _gameplayService.GetStats(gameToken);

        if (result.IsSuccess) {
            return Ok(new {
                status = "SUCCESS",
                message = "Stats retrieved successfully",
                stats = new {
                    name = result.Name,
                    currentQuestion = result.CurrentQuestion,
                    currentPlayer = result.CurrentPlayer,
                    currentSequencePart = result.CurrentSequencePart,
                }
            });
        }

        return BadRequest(result.Message);
    }
}
