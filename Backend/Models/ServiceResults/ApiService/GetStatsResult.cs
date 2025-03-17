
namespace Backend.Models.ServiceResults.ApiService;

public class GetStatsResult : BaseResult
{
    public int? TotalQuestions { get; set; }
    public int? TotalSequences { get; set; }
    public int? TotalPlayers { get; set; }
    public int? TotalGames { get; set; }
}