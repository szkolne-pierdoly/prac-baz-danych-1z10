using Backend.Data.Models;

namespace Backend.Interface.Repositories;

public interface IGameRepository
{
    Task<Game> CreateGame(Game game);
    Task<List<Game>> GetAllGames(bool includePlayers = false, bool includeActions = false, bool includeSequence = false, int? limit = null, int? offset = null, string? search = null);
    Task<Game?> GetGameById(int id);
    Task<Game?> UpdateGame(Game game);
    Task<Game?> DeleteGame(int id);
}
