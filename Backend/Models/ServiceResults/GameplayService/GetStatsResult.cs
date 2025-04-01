using Backend.Data.Enum;
using Backend.Data.Models;
using Microsoft.AspNetCore.Mvc.TagHelpers;

namespace Backend.Models.ServiceResults.GameplayService;

public class GetStatsResult : BaseResult
{
    public string? Name { get; set; }
    public Question? CurrentQuestion { get; set; }
    public Player? CurrentPlayer { get; set; }
    public SequencePart? CurrentSequencePart { get; set; }
}