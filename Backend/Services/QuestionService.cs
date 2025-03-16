using System.Xml.Serialization;
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

    public async Task<ImportQuestionsResult> ImportQuestions(ImportQuestionsRequest request)
    {
      try {
        var file = request.File;
        if (file == null || file.Length == 0) {
          return new ImportQuestionsResult {
            IsSuccess = false,
            Status = "ERROR",
            Message = "File is required"
          };
        }
        var questions = new List<Question>();
        var serializer = new XmlSerializer(typeof(List<Question>), new XmlRootAttribute("Questions"));

        using (var stream = file.OpenReadStream())
        {
          try
          {
            questions = serializer.Deserialize(stream) as List<Question>;
          }
          catch (InvalidOperationException xmlEx)
          {
            return new ImportQuestionsResult {
              IsSuccess = false,
              Status = "ERROR",
              Message = $"Invalid XML file format: {xmlEx.Message}"
            };
          }
        }

        if (questions == null || questions.Count == 0) {
          return new ImportQuestionsResult {
            IsSuccess = false,
            Status = "ERROR",
            Message = "No questions found in file"
          };
        }

        await _questionRepository.CreateMultipleQuestions(questions);

        return new ImportQuestionsResult {
          IsSuccess = true,
          Status = "SUCCESS",
          Message = "Questions imported successfully",
          Questions = questions
        };
      }
      catch (Exception ex)
      {
        return new ImportQuestionsResult {
          IsSuccess = false,
          Status = "ERROR",
          Message = ex.Message,
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

    public async Task<BaseResult> DeleteMultipleQuestions(string ids)
    {
        try
        {
            if (string.IsNullOrEmpty(ids))
            {
                return new BaseResult {
                  IsSuccess = false,
                  Status = "ERROR",
                  Message = "No IDs provided"
                };
            } 

            var idStrings = ids.Split(',');
            if (idStrings.Length == 0) {
                return new BaseResult {
                  IsSuccess = false,
                  Status = "ERROR",
                  Message = "No IDs provided"
                };
            }

            if (!idStrings.All(idStr => int.TryParse(idStr, out _)))
            {
                return new BaseResult
                {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Invalid IDs format. Please provide comma-separated integers."
                };
            }

            var idsArray = idStrings.Select(int.Parse).ToArray();
            await _questionRepository.DeleteMultipleQuestions(idsArray);

            return new BaseResult {
              IsSuccess = true,
              Status = "SUCCESS",
              Message = "Questions deleted successfully"
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

