
namespace Backend.Data.Models;

public class Answer {
  public int Id { get; set; }
  public required int QuestionId { get; set; }
  public required Question question { get; set; }
  public required int Points { get; set; }
}