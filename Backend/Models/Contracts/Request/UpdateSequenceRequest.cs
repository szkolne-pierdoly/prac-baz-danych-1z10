
using Backend.Models.DTOs;

namespace Backend.Models.Contracts.Request;

public class UpdateSequenceRequest
{
    public required string Name { get; set; }
    public required List<int> Part1QuestionIds { get; set; }
    public required List<int> Part2QuestionIds { get; set; }
    public required List<int> Part3QuestionIds { get; set; }
}