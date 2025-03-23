namespace Backend.Data.Models;

public class GamePlayer
{
    public int Id { get; set; }
    public int GameId { get; set; }
    public int PlayerId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Points { get; set; } = 0;
    public int Lives { get; set; } = 3;
    public virtual ICollection<GameAction> Actions { get; set; } = new List<GameAction>();
    public virtual required Player Player { get; set; }
}