using Backend.Data.Models;

namespace Backend.Models.ServiceResults.SequenceService;

public class GetSequenceResult : BaseResult
{
    public Sequence? Sequence { get; set; }
}
