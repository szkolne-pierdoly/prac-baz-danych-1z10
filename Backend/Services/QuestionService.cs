using Backend.Data.Models;
using Backend.Interface.Repositories;
using Backend.Interface.Services;
using Backend.Models.Contracts.Request;

namespace Backend.Services;

public class QuestionService : IQuestionService
{
    private readonly IQuestionRepository _questionRepository;

    public QuestionService(IQuestionRepository questionRepository)
    {
        _questionRepository = questionRepository;
    }
    
    public async Task<BaseResult> CreateQuestion(CreateQuestionRequest request)
    {
        try 
        {
          var question = new Question
        {
            Content = request.Content,
            Hint = request.Hint1,
            hint2 = request.Hint2,
            CorrectAnswer = request.CorrectAnswer,
        };

        await _questionRepository.CreateQuestion(question);

            return new BaseResult {
              IsSuccess = true,
              Status = "SUCCESS",
              Message = "Question created successfully"
            };
        }
        catch (Exception ex)
        {
            return new BaseResult {
              IsSuccess = false,
              Status = "ERROR",
              Message = ex.Message
            };
        }
    }
}

