
using Backend.Models.DTOs;

namespace Backend.Contracts.Request;

public class CreateSequenceRequest
{
    public required string Name { get; set; }
    public required List<QuestionDto> Questions { get; set; }
}