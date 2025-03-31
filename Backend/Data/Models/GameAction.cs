using Backend.Data.Enum;

namespace Backend.Data.Models;

public class GameAction
{
    public int Id { get; set; }
    public int GameId { get; set; }
    public int? GamePlayerId { get; set; }
    public GameActionType Type { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int? QuestionId { get; set; }
    public int? Points { get; set; }
    public bool? AnswerCorrect { get; set; }

    // Navigation properties
    public virtual Game Game { get; set; } = null!;
    public virtual GamePlayer? GamePlayer { get; set; }
    public virtual Question? Question { get; set; }
}