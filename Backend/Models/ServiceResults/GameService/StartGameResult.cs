using Backend.Data.Models;

namespace Backend.Models.ServiceResults.GameService;

public class StartGameResult : BaseResult
{
    public string? GameToken { get; set; }
}