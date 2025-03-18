
using Backend.Data.Models;

namespace Backend.Models.ServiceResults.SequenceService;

public class GetSequencePartQuestionResult : BaseResult
{
    public List<SequenceQuestion>? Questions { get; set; }
}