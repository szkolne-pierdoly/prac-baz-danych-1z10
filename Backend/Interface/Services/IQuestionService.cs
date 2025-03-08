
using Backend.Models.Contracts.Request;

namespace Backend.Interface.Services;

public interface IQuestionService
{
    Task<BaseResult> CreateQuestion(CreateQuestionRequest request);
}
