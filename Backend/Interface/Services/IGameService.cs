using Backend.Data.Models;

namespace Backend.Interface.Services;

public interface IGameService
{
    Task<Game> CreateGame(Game game);
}
