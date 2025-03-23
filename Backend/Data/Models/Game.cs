
namespace Backend.Data.Models;

public class Game
{
    public int Id { get; set; }
    public DateTime StartTime { get; set; } = DateTime.Now;
    public DateTime? EndTime { get; set; }
    public int SequenceId { get; set; }
    public virtual required Sequence Sequence { get; set; }
    public virtual required ICollection<GamePlayer> Players { get; set; }
    public virtual required ICollection<GameAction> Actions { get; set; }