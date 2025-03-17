
using Backend.Models.ServiceResults.ApiService;

namespace Backend.Interface.Services;

public interface IApiService
{
    Task<GetStatsResult> GetStats();
}
