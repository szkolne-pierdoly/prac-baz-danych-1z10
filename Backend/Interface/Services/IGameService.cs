using Backend.Data.Models;
using Backend.Models.Contracts.Request;
using Backend.Models.ServiceResults.GameService;

namespace Backend.Interface.Services;

public interface IGameService
{
    Task<StartGameResult> CreateGame(StartGameRequest request);
    Task<GetAllGamesResult> GetAllGames();
    Task<GetGameByIdResult> GetGameById(int id);
    Task<UpdateGameResult> UpdateGame(int id, UpdateGameRequest request);
    Task<DeleteGameResult> DeleteGame(int id);
}
