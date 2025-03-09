using Backend.Models.Contracts.Request;
using Backend.Models.ServiceResults.SequenceService;
namespace Backend.Interface.Services;

public interface ISequenceService
{
    Task<BaseResult> CreateSequence(CreateSequenceRequest request);
    Task<GetAllSequencesResult> GetAllSequences();
    Task<GetSequenceResult> GetSequence(int id);
    Task<BaseResult> UpdateSequence(UpdateSequenceRequest request, int id);
    Task<BaseResult> DeleteSequence(int id);
}
