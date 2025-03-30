
namespace Backend.Models.ServiceResults.GameplayService;

public class ValidateGameTokenResult : BaseResult
{
    public bool? IsValid { get; set; }
    public int? GameId { get; set; }
    public string? GameStatus { get; set; }
}