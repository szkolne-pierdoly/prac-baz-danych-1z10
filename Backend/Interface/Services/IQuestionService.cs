using Backend.Models.Contracts.Request;
using Backend.Models.ServiceResults.QuestionService;

namespace Backend.Interface.Services;

public interface IQuestionService
{
    Task<CreateQuestionResult> CreateQuestion(CreateQuestionRequest request);
    Task<ImportQuestionsResult> ImportQuestions(ImportQuestionsRequest request);
    Task<GetAllQuestionsResult> GetQuestions(string? search = null, int? page = null, int? pageSize = null, int? ignoreInSequence = null);
    Task<UpdateQuestionResult> UpdateQuestion(UpdateQuestionRequest request, int id);
    Task<BaseResult> DeleteQuestion(int id);
    Task<BaseResult> DeleteMultipleQuestions(string ids);
}
