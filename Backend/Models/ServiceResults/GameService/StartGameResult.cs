using Backend.Data.Models;

namespace Backend.Models.ServiceResults.GameService;

public class StartGameResult : BaseResult
{
    public Game? Game { get; set; }
}
