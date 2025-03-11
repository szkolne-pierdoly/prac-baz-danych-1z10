using Backend.Data.Models;

namespace Backend.Models.ServiceResults.QuestionService;

public class UpdateSequenceResult : BaseResult
{
    public Sequence? Sequence { get; set; }
}
