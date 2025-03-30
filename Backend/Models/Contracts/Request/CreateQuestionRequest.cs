namespace Backend.Models.Contracts.Request;

public class CreateQuestionRequest
{
    public required string Content { get; set; }
    public required string CorrectAnswer { get; set; }
    public required string Variant2 { get; set; }
    public string? Variant3 { get; set; }
}
