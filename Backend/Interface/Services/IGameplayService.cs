
using Backend.Models.ServiceResults.GameplayService;

namespace Backend.Interface.Services;

public interface IGameplayService
{
    Task<ValidateGameTokenResult> ValidateGameToken(string gameToken);
    Task<GetAllDataResult> GetAllData(string gameToken);
    Task<GetStatsResult> GetStats(string gameToken);
}
