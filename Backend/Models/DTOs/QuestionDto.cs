namespace Backend.Models.DTOs;

public class QuestionDto
{
    public required string Content { get; set; }
    public required string Hint1 { get; set; }
    public string? Hint2 { get; set; }
    public required string CorrectAnswer { get; set; }
}