using Backend.Data.Models;

namespace Backend.Models.ServiceResults.SequenceService;

public class GetAllSequencesResult : BaseResult
{
    public IEnumerable<Sequence>? Sequences { get; set; }
}
