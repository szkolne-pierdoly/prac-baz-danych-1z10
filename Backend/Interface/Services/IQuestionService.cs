using Backend.Models.Contracts.Request;
using Backend.Models.ServiceResults.QuestionService;

namespace Backend.Interface.Services;

public interface IQuestionService
{
    Task<BaseResult> CreateQuestion(CreateQuestionRequest request);
    Task<GetAllQuestionsResult> GetAllQuestions();
    Task<BaseResult> UpdateQuestion(UpdateQuestionRequest request, int id);
    Task<BaseResult> DeleteQuestion(int id);
}
