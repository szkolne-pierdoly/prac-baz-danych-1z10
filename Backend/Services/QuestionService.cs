using Backend.Data.Models;
using Backend.Interface.Repositories;
using Backend.Interface.Services;
using Backend.Models.Contracts.Request;
using Backend.Models.ServiceResults.QuestionService;
namespace Backend.Services;

public class QuestionService : IQuestionService
{
    private readonly IQuestionRepository _questionRepository;

    public QuestionService(IQuestionRepository questionRepository)
    {
        _questionRepository = questionRepository;
    }
    
    public async Task<CreateQuestionResult> CreateQuestion(CreateQuestionRequest request)
    {
        try 
        { 
          var question = new Question
        {
            Content = request.Content,
            Hint = request.Hint,
            Hint2 = request.Hint2,
            CorrectAnswer = request.CorrectAnswer,
        };

        await _questionRepository.CreateQuestion(question);

            return new CreateQuestionResult {
              IsSuccess = true,
              Status = "SUCCESS",
              Message = "Question created successfully",
              Question = question
            };
        }
        catch (Exception ex)
        {
            return new CreateQuestionResult {
              IsSuccess = false,
              Status = "ERROR",
              Message = ex.Message
            };
        }
    }

    public async Task<GetAllQuestionsResult> GetAllQuestions()
    {
        try
        {
            var questions = await _questionRepository.GetAllQuestions();

            return new GetAllQuestionsResult {
              IsSuccess = true,
              Status = "SUCCESS",
              Message = "Questions fetched successfully",
              Questions = questions
            };
        }
        catch (Exception ex)
        {
            return new GetAllQuestionsResult {
              IsSuccess = false,
              Status = "ERROR",
              Message = ex.Message
            };
        }
    } 

    public async Task<UpdateQuestionResult> UpdateQuestion(UpdateQuestionRequest request, int id)
    {
        try
        {
            if (request.Content == null && request.Hint == null && request.Hint2 == null && request.CorrectAnswer == null)
            {
                return new UpdateQuestionResult {
                  IsSuccess = false,
                  Status = "ERROR",
                  Message = "No fields to update"
                };
            }

            var question = await _questionRepository.GetQuestionById(id);

            if (question == null)
            {
                return new UpdateQuestionResult { 
                  IsSuccess = false,
                  Status = "ERROR",
                  Message = "Question not found"
                };
            } else if (question.Content == request.Content && question.Hint == request.Hint && question.Hint2 == request.Hint2 && question.CorrectAnswer == request.CorrectAnswer)
            {
                return new UpdateQuestionResult {
                  IsSuccess = false,
                  Status = "ERROR",
                  Message = "Already up to date."
                };
            }
            question.Content = request.Content ?? question.Content;
            question.Hint = request.Hint ?? question.Hint;
            question.Hint2 = request.Hint2 ?? question.Hint2;
            question.CorrectAnswer = request.CorrectAnswer ?? question.CorrectAnswer;

            await _questionRepository.UpdateQuestion(question);

            return new UpdateQuestionResult {
              IsSuccess = true,
              Status = "SUCCESS",
              Message = "Question updated successfully",
              Question = question
            };
        } 
        catch (Exception ex)
        {
            return new UpdateQuestionResult {
              IsSuccess = false,
              Status = "ERROR",
              Message = ex.Message
            };
        }
    }

    public async Task<BaseResult> DeleteQuestion(int id)
    {
        try
        {
            var question = await _questionRepository.GetQuestionById(id);

            if (question == null)
            {
                return new BaseResult {
                  IsSuccess = false,
                  Status = "ERROR",
                  Message = "Question not found"
                };
            }

            await _questionRepository.DeleteQuestion(id);

            return new BaseResult {
              IsSuccess = true,
              Status = "SUCCESS",
              Message = "Question deleted successfully"
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

