
namespace Backend.Data.Models;

public class Game {
  public int Id { get; set; }
  public required string Name { get; set; }
  public virtual required ICollection<Answer> Answers { get; set; }
  public virtual required Sequence Sequence { get; set; }
  public virtual required Player Player { get; set; }
  public int SequenceId { get; set; }
  public int PlayerId { get; set; }
}