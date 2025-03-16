
using Backend.Data.Models;

namespace Backend.Models.ServiceResults.PlayerService;

public class CreatePlayerResult : BaseResult
{
    public Player? Player { get; set; }
}
