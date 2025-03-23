using Backend.Data.Models;

namespace Backend.Models.ServiceResults.GameService;

public class DeleteGameResult : BaseResult
{
  public Game? Game { get; set; }
}