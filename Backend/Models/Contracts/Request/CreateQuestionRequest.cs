namespace Backend.Models.Contracts.Request;

public class CreateQuestionRequest
{
    public required string Content { get; set; }
    public required string Answer { get; set; }
    public required string Hint1 { get; set; }
    public string? Hint2 { get; set; }
}
