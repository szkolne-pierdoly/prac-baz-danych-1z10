using Backend.Data.Models;

namespace Backend.Models.ServiceResults.GameService;

public class UpdateGameResult : BaseResult
{
    public Game? Game { get; set; }
}
