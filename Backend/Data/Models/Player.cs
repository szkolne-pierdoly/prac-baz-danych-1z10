
namespace Backend.Data.Models;

public class Player {
  public int Id { get; set; }
  public required string Name { get; set; }
  public virtual required ICollection<Game> Games { get; set; }
}