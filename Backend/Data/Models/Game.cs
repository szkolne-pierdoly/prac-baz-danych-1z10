
namespace Backend.Data.Models;

public class Game {
  public int Id { get; set; }
  public required string Name { get; set; }
  public virtual required List<Answer> Answers { get; set; }
  public required Sequence Sequence { get; set; }
  public int SequenceId { get; set; }
}