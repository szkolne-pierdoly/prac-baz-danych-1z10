
using Backend.Models.ServiceResults.GameplayService;

namespace Backend.Interface.Services;

public interface IGameplayService
{
    Task<ValidateGameTokenResult> ValidateGameToken(string gameToken);
}
