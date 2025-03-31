using Backend.Data.Enum;

namespace Backend.Data.Models;

public class GameAction
{
    public int Id { get; set; }
    public bool? AnswerCorrect { get; set; }
    public required int GameId { get; set; }
    public int? GamePlayerId { get; set; }
    public int? PointsGained { get; set; }
    public int? SequencesQuestionId { get; set; }
    public required GameActionType Type { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual Game Game { get; set; } = null!;
    public virtual GamePlayer? GamePlayer { get; set; }
    public virtual SequenceQuestion? SequencesQuestion { get; set; }
}