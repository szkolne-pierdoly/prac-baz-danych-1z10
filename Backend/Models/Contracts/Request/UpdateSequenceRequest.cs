
using Backend.Models.DTOs;

namespace Backend.Models.Contracts.Request;

public class UpdateSequenceRequest
{
    public required string Name { get; set; }
    public required List<int> QuestionIds { get; set; }
}