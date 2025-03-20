
using Backend.Data.Models;

namespace Backend.Models.ServiceResults.SequenceService;

public class UpdateSequenceQuestionResult : BaseResult
{
    public SequenceQuestion? SequenceQuestion { get; set; }
}
