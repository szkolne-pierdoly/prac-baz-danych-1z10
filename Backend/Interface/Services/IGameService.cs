using Backend.Data.Models;
using Backend.Models.Contracts.Request;
using Backend.Models.ServiceResults.GameService;

namespace Backend.Interface.Services;

public interface IGameService
{
    Task<CreateGameResult> CreateGame(CreateGameRequest request);
    Task<GetAllGamesResult> GetAllGames(bool includePlayers = false, bool includeActions = false, bool includeSequence = false, int? limit = null, int? offset = null, string? search = null);
    Task<GetGameByIdResult> GetGameById(int id);
    Task<UpdateGameResult> UpdateGame(int id, UpdateGameRequest request);
    Task<DeleteGameResult> DeleteGame(int id);
}
