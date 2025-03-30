
using System.Security.Cryptography;
using System.Text;
using Backend.Interface.Repositories;
using Backend.Interface.Services;
using Backend.Models.ServiceResults.GameplayService;

namespace Backend.Services;

public class GameplayService : IGameplayService
{
    private readonly IGameRepository _gameRepository;

    public GameplayService(IGameRepository gameRepository)
    {
        _gameRepository = gameRepository;
    }

    public async Task<ValidateGameTokenResult> ValidateGameToken(string gameToken)
    {
        try {
            var gameTokenHash = SHA256.HashData(Encoding.UTF8.GetBytes(gameToken));
            var gameTokenHashString = Convert.ToBase64String(gameTokenHash);
            var game = await _gameRepository.GetGameByTokenHash(gameTokenHashString);
            if (game == null)
            {
                return new ValidateGameTokenResult {
                    IsSuccess = false,
                    IsValid = false,
                    Status = "ERROR",
                    Message = "Invalid game token"
                };
            }

            if (game.StartTime == null || game.Actions.Count == 0)
            {
                return new ValidateGameTokenResult {
                    IsSuccess = false,
                    IsValid = false,
                    Status = "ERROR",
                    Message = "Game has not started yet"
                };
            }

            if (game.EndTime != null)
            {
                return new ValidateGameTokenResult {
                    IsSuccess = false,
                    IsValid = false,
                    Status = "ERROR",
                    Message = "Game has ended"
                };
            }

            return new ValidateGameTokenResult {
                IsSuccess = true,
                IsValid = true,
                Status = "GAME_IN_PROGRESS",
                GameId = game.Id,
                GameStatus = "GAME_IN_PROGRESS"
            };
        }
        catch (Exception ex)
        {
            return new ValidateGameTokenResult {
                IsSuccess = false,
                IsValid = false,
                Status = "ERROR",
                Message = ex.Message
            };
        }
    }
}
