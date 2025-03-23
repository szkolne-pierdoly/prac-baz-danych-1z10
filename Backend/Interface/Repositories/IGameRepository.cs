using Backend.Data.Models;

namespace Backend.Interface.Repositories;

public interface IGameRepository
{
    Task<Game> CreateGame(Game game);
}
