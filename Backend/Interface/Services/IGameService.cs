using Backend.Data.Models;
using Backend.Models.Contracts.Request;
using Backend.Models.ServiceResults.GameService;

namespace Backend.Interface.Services;

public interface IGameService
{
    Task<StartGameResult> StartGame(StartGameRequest request);
}
