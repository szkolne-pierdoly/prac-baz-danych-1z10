using Backend.Data.Models;

namespace Backend.Models.ServiceResults.SequenceService;

public class CreateSequenceResult : BaseResult
{
    public Sequence? Sequence { get; set; }
}