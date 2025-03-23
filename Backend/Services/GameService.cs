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

    public async Task<StartGameResult> StartGame(StartGameRequest request)
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
                Actions = new List<GameAction>()
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
}
