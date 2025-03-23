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

    public async Task<StartGameResult> CreateGame(StartGameRequest request)
    {
        try {
            if (request.PlayerIds.Count != 10) {
                return new StartGameResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "To start the game, you need exactly 10 players"
                };
            }

            var sequence = await _sequenceRepository.GetSequenceById(request.SequenceId);
            if (sequence == null) {
                return new StartGameResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Sequence with ID " + request.SequenceId + " not found"
                };
            }
            var game = new Game {
                Sequence = sequence,
                Players = new List<GamePlayer>(),
                Actions = new List<GameAction>(),
                CreatedAt = DateTime.UtcNow
            };

            List<GamePlayer> gamePlayers = new List<GamePlayer>();
            foreach (var playerId in request.PlayerIds) {
                var player = await _playerRepository.GetPlayerById(playerId);
                if (player == null) {
                    return new StartGameResult {
                        IsSuccess = false,
                        Status = "ERROR",
                        Message = "Player with ID " + playerId + " not found"
                    };
                }
                gamePlayers.Add(new GamePlayer {
                    PlayerId = playerId,
                    GameId = game.Id,
                    Name = player.Name
                });
            }

            if (gamePlayers.Count != 10) {
                return new StartGameResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "To start the game, you need exactly 10 players"
                };
            }

            game.Players = gamePlayers;

            var result = await _gameRepository.CreateGame(game);

            return new StartGameResult {
                IsSuccess = true,
                Status = "SUCCESS",
                Game = result
            };
        } catch (Exception ex) {
            return new StartGameResult {
                IsSuccess = false,
                Status = "ERROR",
                Message = ex.Message
            };
        }
    }

    public async Task<GetAllGamesResult> GetAllGames()
    {
        try {
            var games = await _gameRepository.GetAllGames();
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
                Name = playerId.ToString()
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
