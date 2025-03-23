using Backend.Data.Models;
using Backend.Interface.Repositories;
using Backend.Interface.Services;

namespace Backend.Services;

public class GameService : IGameService
{
    private readonly IGameRepository _gameRepository;

    public GameService(IGameRepository gameRepository)
    {
        _gameRepository = gameRepository;
    }

    public async Task<Game> CreateGame(Game game)
    {
        throw new NotImplementedException();
    }
}
