using Backend.Data.Models;

namespace Backend.Models.ServiceResults.SequenceService;

public class GetSequencesResult : BaseResult
{
    public IEnumerable<Sequence>? Sequences { get; set; }
    public int? TotalItems { get; set; }
}
