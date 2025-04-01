using Backend.Data.Enum;
using Backend.Data.Models;

namespace Backend.Models.ServiceResults.GameplayService;

public class GetAllDataResult : BaseResult
{
    public string? Name { get; set; }
    public List<GamePlayer>? Players { get; set; }
    public List<GameAction>? Actions { get; set; }
    public Sequence? Sequence { get; set; }
    public DateTime? StartTime { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public Question? CurrentQuestion { get; set; }
    public GamePlayer? CurrentPlayer { get; set; }
    public SequencePart? CurrentSequencePart { get; set; }
}
