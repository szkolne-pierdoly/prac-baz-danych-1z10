using Backend.Data.Models;
using Backend.Interface.Repositories;
using Backend.Interface.Services;
using Backend.Models.Contracts.Request;
using Backend.Models.ServiceResults.GameService;

namespace Backend.Services;

public class GameService : IGameService
{
    private readonly IGameRepository _gameRepository;
    private readonly ISequenceRepository _sequenceRepository;
    private readonly IPlayerRepository _playerRepository;

    public GameService(IGameRepository gameRepository, ISequenceRepository sequenceRepository, IPlayerRepository playerRepository)
    {
        _gameRepository = gameRepository;
        _sequenceRepository = sequenceRepository;
        _playerRepository = playerRepository;
    }

    public async Task<CreateGameResult> CreateGame(CreateGameRequest request)
    {
        try {
            if (request.Players.Count != 10) {
                return new CreateGameResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "To start the game, you need exactly 10 players"
                };
            }

            var sequence = await _sequenceRepository.GetSequenceById(request.SequenceId);
            if (sequence == null) {
                return new CreateGameResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Sequence with ID " + request.SequenceId + " not found"
                };
            }
            var game = new Game {
                Name = request.Name,
                Sequence = sequence,
                Players = new List<GamePlayer>(),
                Actions = new List<GameAction>(),
                CreatedAt = DateTime.UtcNow
            };

            List<GamePlayer> gamePlayers = new List<GamePlayer>();
            foreach (var playerRequest in request.Players) {
                var player = await _playerRepository.GetPlayerById(playerRequest.PlayerId);
                if (player == null) {
                    return new CreateGameResult {
                        IsSuccess = false,
                        Status = "ERROR",
                        Message = "Player with ID " + playerRequest.PlayerId + " not found"
                    };
                }
                gamePlayers.Add(new GamePlayer {
                    PlayerId = player.Id,
                    GameId = game.Id,
                    Name = player.Name,
                    Color = player.Color,
                    Seat = playerRequest.Seat
                });
            }

            if (gamePlayers.Count != 10) {
                return new CreateGameResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "To start the game, you need exactly 10 players"
                };
            }

            game.Players = gamePlayers;

            var result = await _gameRepository.CreateGame(game);

            return new CreateGameResult {
                IsSuccess = true,
                Status = "SUCCESS",
                Game = result
            };
        } catch (Exception ex) {
            return new CreateGameResult {
                IsSuccess = false,
                Status = "ERROR",
                Message = ex.Message
            };
        }
    }

    public async Task<GetAllGamesResult> GetAllGames(bool includePlayers = false, bool includeActions = false, bool includeSequence = false, int? limit = null, int? offset = null, string? search = null)
    {
        try {
            var games = await _gameRepository.GetAllGames(includePlayers, includeActions, includeSequence, limit, offset, search);
            return new GetAllGamesResult {
                IsSuccess = true,
                Status = "SUCCESS",
                Games = games
            };
        } catch (Exception ex) {
            return new GetAllGamesResult {
                IsSuccess = false,
                Status = "ERROR",
                Message = ex.Message
            };
        }
    }

    public async Task<GetGameByIdResult> GetGameById(int id)
    {
        try {
            var game = await _gameRepository.GetGameById(id);
            return new GetGameByIdResult {
                IsSuccess = true,
                Status = "SUCCESS",
                Game = game
            };
        } catch (Exception ex) {
            return new GetGameByIdResult {
                IsSuccess = false,
                Status = "ERROR",
                Message = ex.Message
            };
        }
    }

    public async Task<UpdateGameResult> UpdateGame(int id, UpdateGameRequest request)
    {
        try {
            if (request.PlayerIds != null && request.PlayerIds.Count != 10) {
                return new UpdateGameResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "To update the game, you need exactly 10 players"
                };
            }

            var game = await _gameRepository.GetGameById(id);
            if (game == null) {
                return new UpdateGameResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Game with ID " + id + " not found"
                };
            }

            game.SequenceId = request.SequenceId ?? game.SequenceId;
            game.Players = request.PlayerIds?.Select(playerId => new GamePlayer {
                PlayerId = playerId,
                GameId = game.Id,
                Name = playerId.ToString(),
                Color = game.Players.FirstOrDefault(p => p.PlayerId == playerId)?.Color ?? "#000000"
            }).ToList() ?? game.Players;

            var result = await _gameRepository.UpdateGame(game);

            return new UpdateGameResult {
                IsSuccess = true,
                Status = "SUCCESS",
                Game = result
            };
        } catch (Exception ex) {
            return new UpdateGameResult {
                IsSuccess = false,
                Status = "ERROR",
                Message = ex.Message
            };
        }
    }

    public async Task<DeleteGameResult> DeleteGame(int id)
    {
        try {
            var game = await _gameRepository.GetGameById(id);
            if (game == null) {
                return new DeleteGameResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Game with ID " + id + " not found"
                };
            }

            var result = await _gameRepository.DeleteGame(id);

            return new DeleteGameResult {
                IsSuccess = true,
                Status = "SUCCESS",
                Game = result
            };
        } catch (Exception ex) {
            return new DeleteGameResult {
                IsSuccess = false,
                Status = "ERROR",
                Message = ex.Message
            };
        }
    }
}
