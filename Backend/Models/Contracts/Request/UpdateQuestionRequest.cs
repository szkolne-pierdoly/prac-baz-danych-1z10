
namespace Backend.Models.Contracts.Request;

public class UpdateQuestionRequest
{
    public string? Content { get; set; }
    public string? Variant2 { get; set; }
    public string? Variant3 { get; set; }
    public string? CorrectAnswer { get; set; }
}