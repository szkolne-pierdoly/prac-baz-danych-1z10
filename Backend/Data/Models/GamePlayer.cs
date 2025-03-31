namespace Backend.Data.Models;

public class GamePlayer
{
    public int Id { get; set; }
    public int GameId { get; set; }
    public int PlayerId { get; set; }
    public required string Name { get; set; }
    public required string Color { get; set; }
    public int Points { get; set; } = 0;
    public int Lives { get; set; } = 3;
    public int Seat { get; set; } = 0;
    public virtual ICollection<GameAction> Actions { get; set; } = new List<GameAction>();
    public virtual Player? Player { get; set; }
}