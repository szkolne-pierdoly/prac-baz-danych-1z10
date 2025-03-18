
using Backend.Data.Models;

namespace Backend.Models.ServiceResults.SequenceService;

public class GetSequenceQuestionsResult : BaseResult
{
    public List<SequenceQuestion>? Part1 { get; set; }
    public List<SequenceQuestion>? Part2 { get; set; }
    public List<SequenceQuestion>? Part3 { get; set; }
}
