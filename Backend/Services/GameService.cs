using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Backend.Data.Enum;
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

    public async Task<DuplicateGameResult> DuplicateGame(int id)
    {
        try {
            var game = await _gameRepository.GetGameById(id);
            if (game == null) {
                return new DuplicateGameResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Game with ID " + id + " not found",
                    HttpStatusCode = 404
                };
            }

            var duplicateGame = new Game {
                Name = game.Name + " (Copy)",
                Sequence = game.Sequence,
                CreatedAt = DateTime.UtcNow,
                Actions = new List<GameAction>(),
                Players = new List<GamePlayer>()
            };

            // Create new GamePlayer objects for the duplicate game
            duplicateGame.Players = game.Players.Select(p => new GamePlayer {
                PlayerId = p.PlayerId,
                Name = p.Name,
                Color = p.Color,
                Points = p.Points,
                Lives = p.Lives,
                Seat = p.Seat
            }).ToList();

            var result = await _gameRepository.CreateGame(duplicateGame);

            return new DuplicateGameResult {
                IsSuccess = true,
                Status = "SUCCESS",
                GameId = result.Id
            };
        } catch (Exception ex) {
            return new DuplicateGameResult {
                IsSuccess = false,
                Status = "ERROR",
                Message = ex.Message
            };
        }
    }

    public async Task<StartGameResult> StartGame(int id)
    {
        try {
            var game = await _gameRepository.GetGameById(id);
            if (game == null) {
                return new StartGameResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Game with ID " + id + " not found"
                };
            }
            if (game.Players.Count != 10) {
                return new StartGameResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Game with ID " + id + " has less than 10 players"
                };
            }
            if (game.StartTime != null) {
                return new StartGameResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Game with ID " + id + " has already started, please duplicate it to start a new game with it"
                };
            }

            var gameToken = Guid.NewGuid().ToString();
            var gameTokenHash = SHA256.HashData(Encoding.UTF8.GetBytes(gameToken));
            var gameTokenHashString = Convert.ToBase64String(gameTokenHash);

            game.GameToken = gameTokenHashString;

            var fisrtPlayer = game.Players.FirstOrDefault(p => p.Seat == 1);
            if (fisrtPlayer == null) {
                return new StartGameResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Unable to find first player"
                };
            }

            var firstQuestion = game.Sequence.Questions.FirstOrDefault(q => q.Order == 1 && q.SequencePart == SequencePart.Part1);
            if (firstQuestion == null) {
                return new StartGameResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Unable to find first question"
                };
            }

            Console.WriteLine("first question: " + JsonSerializer.Serialize(firstQuestion));
            Console.WriteLine("first player: " + JsonSerializer.Serialize(fisrtPlayer));

            var startAction = new GameAction {
                GameId = game.Id,
                Type = GameActionType.Start,
                CreatedAt = DateTime.UtcNow,
                SequencesQuestion = firstQuestion,
                GamePlayer = fisrtPlayer,
            };

            Console.WriteLine("player: " + JsonSerializer.Serialize(fisrtPlayer));
            Console.WriteLine("question: " + JsonSerializer.Serialize(firstQuestion));

            game.Actions.Add(startAction);

            game.StartTime = startAction.CreatedAt;
            game.EndTime = null;
            game.Actions = [startAction];

            var result = await _gameRepository.UpdateGame(game);

            return new StartGameResult {
                IsSuccess = true,
                Status = "SUCCESS",
                GameToken = gameToken
            };
        } catch (Exception ex) {
            return new StartGameResult {
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
            var game = await _gameRepository.GetGameById(id);
            if (game == null) {
                return new UpdateGameResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Game with ID " + id + " not found"
                };
            }
            if (request.Players != null && request.Players.Count() > 0) {
                if (request.Players.Count() != 10) {
                    return new UpdateGameResult {
                        IsSuccess = false,
                        Status = "ERROR",
                        Message = "To update the game, you need exactly 10 players"
                    };
                }
                var seatSet = new HashSet<int>();
                foreach (var playerRequest in request.Players) {
                    if (seatSet.Contains(playerRequest.Seat)) {
                        return new UpdateGameResult {
                            IsSuccess = false,
                            Status = "ERROR",
                            Message = "Each player must have a unique seat number"
                        };
                    }
                    seatSet.Add(playerRequest.Seat);
                }
                var playerSet = new HashSet<int>();
                foreach (var playerRequest in request.Players) {
                    if (playerSet.Contains(playerRequest.PlayerId)) {
                        return new UpdateGameResult {
                            IsSuccess = false,
                            Status = "ERROR",
                            Message = "Each player can only appear once in the game"
                        };
                    }
                    playerSet.Add(playerRequest.PlayerId);
                }
            }

            if (request.SequenceId != null) {
                var sequence = await _sequenceRepository.GetSequenceById(request.SequenceId.Value);
                if (sequence == null) {
                    return new UpdateGameResult {
                        IsSuccess = false,
                        Status = "ERROR",
                        Message = "Sequence with ID " + request.SequenceId + " not found"
                    };
                }
                game.Sequence = sequence;
            }

            if (request.Players != null && request.Players.Count > 0) {
                var gamePlayers = new List<GamePlayer>();
                foreach (var playerObj in request.Players) {
                    var player = await _playerRepository.GetPlayerById(playerObj.PlayerId);
                    if (player == null) {
                        return new UpdateGameResult {
                            IsSuccess = false,
                            Status = "ERROR",
                            Message = "Player with ID " + playerObj.PlayerId + " not found"
                        };
                    }
                    var newGamePlayer = new GamePlayer {
                        PlayerId = player.Id,
                        GameId = game.Id,
                        Name = player.Name,
                        Color = player.Color,
                        Seat = playerObj.Seat
                    };
                    gamePlayers.Add(newGamePlayer);
                }
                game.Players = gamePlayers;
            }

            if (request.Name != null) {
                game.Name = request.Name;
            }

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
