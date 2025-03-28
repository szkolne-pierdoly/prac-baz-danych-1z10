using Backend.Models.Contracts.Request;
using Backend.Models.ServiceResults.QuestionService;
using Backend.Models.ServiceResults.SequenceService;
namespace Backend.Interface.Services;

public interface ISequenceService
{
    Task<CreateSequenceResult> CreateSequence(CreateSequenceRequest request);
    Task<GetSequencesResult> GetSequences(bool includeQuestions, string? search = null, int? page = null, int? pageSize = null);
    Task<GetSequenceResult> GetSequence(int id);
    Task<GetSequenceQuestionsResult> GetSequenceQuestions(int id);
    Task<GetSequencePartQuestionResult> GetSequenceQuestionsPart(int id, int part);
    Task<UpdateSequenceQuestionResult> UpdateSequenceQuestion(int sequenceId, int part, int questionIndex, UpdateSequenceQuestionRequest request);
    Task<UpdateSequenceResult> UpdateSequence(UpdateSequenceRequest request, int id);
    Task<BaseResult> CleanSequencePartOrder(int id, int part);
    Task<BaseResult> ReorderSequenceQuestion(int id, int part, int question, ReorderSequenceQuestionRequest request);
    Task<BaseResult> DeleteSequence(int id);
}
