
namespace Backend.Data.Models;

public class Question
{
    public int Id { get; set; }
    public required string Content { get; set; }
    public required string Hint { get; set; }
    public string? Hint2 { get; set; }
    public required string CorrectAnswer { get; set; }
}