using Backend.Data.Models;

namespace Backend.Models.ServiceResults.GameService;

public class CreateGameResult : BaseResult
{
    public Game? Game { get; set; }
}
