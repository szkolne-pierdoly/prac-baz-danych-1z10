
namespace Backend.Models.Contracts.Request;

public class UpdateQuestionRequest {
    public string? Content {get; set;}
    public string? Hint {get; set;}
    public string? Hint2 {get; set;}
    public string? CorrectAnswer {get; set;}
}