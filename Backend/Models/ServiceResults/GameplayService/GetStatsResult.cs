using Backend.Data.Enum;
using Backend.Data.Models;
using Microsoft.AspNetCore.Mvc.TagHelpers;

namespace Backend.Models.ServiceResults.GameplayService;

public class GetStatsResult : BaseResult
{
    public string? Name { get; set; }
    public List<GamePlayer>? Players { get; set; }
    public Sequence? Sequence { get; set; }
    public DateTime? StartTime { get; set; }
    public DateTime? EndTime { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public Question? CurrentQuestion { get; set; }
    public Player? CurrentPlayer { get; set; }
    public SequencePart? CurrentSequencePart { get; set; }
    public int TotalPlayers { get; set; }
}