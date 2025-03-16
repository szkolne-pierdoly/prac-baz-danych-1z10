using Backend.Models.Contracts.Request;
using Backend.Models.ServiceResults.QuestionService;

namespace Backend.Interface.Services;

public interface IQuestionService
{
    Task<CreateQuestionResult> CreateQuestion(CreateQuestionRequest request);
    Task<ImportQuestionsResult> ImportQuestions(ImportQuestionsRequest request);
    Task<GetAllQuestionsResult> GetAllQuestions();
    Task<UpdateQuestionResult> UpdateQuestion(UpdateQuestionRequest request, int id);
    Task<BaseResult> DeleteQuestion(int id);
}
