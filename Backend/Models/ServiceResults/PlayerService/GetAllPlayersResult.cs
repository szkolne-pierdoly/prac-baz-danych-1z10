using Backend.Data.Models;

namespace Backend.Models.ServiceResults.PlayerService;

public class GetAllPlayersResult : BaseResult
{
    public IEnumerable<Player>? Players { get; set; }
}
