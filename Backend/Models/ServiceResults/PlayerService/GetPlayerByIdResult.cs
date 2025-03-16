
using Backend.Data.Models;

namespace Backend.Models.ServiceResults.PlayerService;

public class GetPlayerByIdResult : BaseResult
{
    public Player? Player { get; set; }
}
