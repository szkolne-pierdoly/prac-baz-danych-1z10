
using Backend.Models.DTOs;

namespace Backend.Models.Contracts.Request;

public class UpdateSequenceRequest
{
    public string Name { get; set; }
    public List<int> Part1QuestionIds { get; set; }
    public List<int> Part2QuestionIds { get; set; }
    public List<int> Part3QuestionIds { get; set; }
}