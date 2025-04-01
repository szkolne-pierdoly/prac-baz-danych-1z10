using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Backend.Data.Enum;
using Backend.Data.Models;
using Backend.Interface.Repositories;
using Backend.Interface.Services;
using Backend.Models.ServiceResults.GameplayService;
using Microsoft.EntityFrameworkCore.Metadata;

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

    public async Task<GetAllDataResult> GetAllData(string gameToken)
    {
        try {
            var gameTokenHash = SHA256.HashData(Encoding.UTF8.GetBytes(gameToken));
            var gameTokenHashString = Convert.ToBase64String(gameTokenHash);
            var game = await _gameRepository.GetGameByTokenHash(gameTokenHashString);
            if (game == null) {
                return new GetAllDataResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Invalid game token"
                };
            }

            var players = game.Players.Select(p => new GamePlayer {
                Id = p.Id,
                Name = p.Name,
                Color = p.Color,
                Points = p.Points,
                Lives = p.Lives,
            }).ToList();

            var actions = game.Actions.Select(a => new GameAction {
                Id = a.Id,
                Type = a.Type,
                CreatedAt = a.CreatedAt,
                PointsGained = a.PointsGained,
                GameId = a.GameId,
                GamePlayerId = a.GamePlayerId,
                SequencesQuestionId = a.SequencesQuestionId,
                AnswerCorrect = a.AnswerCorrect
            }).ToList();

            var sequence = game.Sequence;

            var latestAction = actions.OrderByDescending(a => a.CreatedAt).FirstOrDefault();
            SequencePart? currentSequencePart = latestAction?.SequencesQuestion?.SequencePart;
            Question? currentQuestion;
            GamePlayer? currentPlayer;

            if (game.Actions.Count == 1) {
                currentQuestion = game.Sequence.Questions.First(q => q.Order == 1).Question;
                currentPlayer = players.FirstOrDefault();
                Console.WriteLine("first question");
            } else {
                currentQuestion = latestAction?.SequencesQuestion?.Question;
                currentPlayer = latestAction?.GamePlayer;
                Console.WriteLine("latest question");
            }

            Console.WriteLine(JsonSerializer.Serialize(game.Sequence.Questions.First(q => q.Order == 1)));
            Console.WriteLine(JsonSerializer.Serialize(currentPlayer));
            Console.WriteLine(JsonSerializer.Serialize(currentSequencePart));
            Console.WriteLine(JsonSerializer.Serialize(game.Sequence.Questions));

            if (players == null || players.Count != 10 || actions == null || actions.Count == 0 || sequence == null || latestAction == null || currentQuestion == null || currentPlayer == null || currentSequencePart == null) {
                return new GetAllDataResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Game data is not complete, please try again later",
                    Name = game.Name,
                    Players = players,
                    Actions = actions,
                    Sequence = sequence,
                    CurrentQuestion = currentQuestion,
                    CurrentPlayer = currentPlayer,
                    CurrentSequencePart = currentSequencePart,
                    CreatedAt = game.CreatedAt,
                    UpdatedAt = game.UpdatedAt,
                    StartTime = game.StartTime
                };
            }

            var result = new GetAllDataResult {
                IsSuccess = true,
                Status = "SUCCESS",
                Message = "Game data retrieved successfully",
                Name = game.Name,
                Players = players,
                Actions = actions,
                Sequence = sequence,
                CurrentQuestion = currentQuestion,
                CurrentPlayer = currentPlayer,
                CurrentSequencePart = currentSequencePart
            };

            return result;
        } catch (Exception ex) {
            return new GetAllDataResult {
                IsSuccess = false,
                Status = "ERROR",
                Message = ex.Message
            };
        }
    }
    public async Task<GetStatsResult> GetStats(string gameToken)
    {
        try {
            var gameTokenHash = SHA256.HashData(Encoding.UTF8.GetBytes(gameToken));
            var gameTokenHashString = Convert.ToBase64String(gameTokenHash);
            var game = await _gameRepository.GetGameByTokenHash(gameTokenHashString);
            if (game == null) {
                return new GetStatsResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Invalid game token"
                };
            }

            var stats = new GetStatsResult {
                IsSuccess = true,
                Status = "SUCCESS",
                Message = "Stats retrieved successfully",
                Name = game.Name,
                CurrentQuestion = game.Actions.OrderByDescending(a => a.CreatedAt).FirstOrDefault(a => a.Type == GameActionType.Start)?.SequencesQuestion?.Question,
                CurrentPlayer = game.Actions.OrderByDescending(a => a.CreatedAt).FirstOrDefault(a => a.Type == GameActionType.Start)?.GamePlayer?.Player,
                CurrentSequencePart = game.Actions.OrderByDescending(a => a.CreatedAt).FirstOrDefault(a => a.Type == GameActionType.Start)?.SequencesQuestion?.SequencePart,
            };

            return stats;
        } catch (Exception ex) {
            return new GetStatsResult {
                IsSuccess = false,
                Status = "ERROR",
                Message = ex.Message
            };
        }
    }
}
