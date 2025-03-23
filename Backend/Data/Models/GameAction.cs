using Backend.Data.Enum;

namespace Backend.Data.Models;

public class GameAction
{
    public int Id { get; set; }
    public int GameId { get; set; }
    public GameActionType Type { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int? PlayerId { get; set; }
    public virtual Player? Player { get; set; }
    public int? Points { get; set; }
    public bool? AnswerCorrect { get; set; }
}