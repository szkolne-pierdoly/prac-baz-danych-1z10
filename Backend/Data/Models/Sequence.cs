
namespace Backend.Data.Models;

public class Sequence {
  public int Id { get; set; }
  public required string Name { get; set; }
  public required List<Question> Questions { get; set; }
}