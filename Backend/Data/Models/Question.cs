namespace Backend.Data.Models;

public class Question
{
    public int Id { get; set; }
    public required string Content { get; set; }
    public required string Variant2 { get; set; }
    public string? Variant3 { get; set; }
    public required string CorrectAnswer { get; set; }
    
}