using Backend.Models.Contracts.Request;
using Backend.Models.ServiceResults.QuestionService;
using Backend.Models.ServiceResults.SequenceService;
namespace Backend.Interface.Services;

public interface ISequenceService
{
    Task<CreateSequenceResult> CreateSequence(CreateSequenceRequest request);
    Task<GetAllSequencesResult> GetAllSequences();
    Task<GetSequenceResult> GetSequence(int id);
    Task<UpdateSequenceResult> UpdateSequence(UpdateSequenceRequest request, int id);
    Task<BaseResult> DeleteSequence(int id);
}
