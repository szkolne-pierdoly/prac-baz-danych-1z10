
namespace Backend.Data.Models;

public class Player
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Color { get; set; }
    public virtual ICollection<GamePlayer> Players { get; set; } = new List<GamePlayer>();
}