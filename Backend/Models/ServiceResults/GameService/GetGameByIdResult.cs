using Backend.Data.Models;

namespace Backend.Models.ServiceResults.GameService;

public class GetGameByIdResult : BaseResult
{
    public Game? Game { get; set; }
}
