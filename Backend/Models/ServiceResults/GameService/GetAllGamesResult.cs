using Backend.Data.Models;

namespace Backend.Models.ServiceResults.GameService;

public class GetAllGamesResult : BaseResult
{
    public List<Game>? Games { get; set; }
}