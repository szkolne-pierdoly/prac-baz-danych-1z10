using Backend.Interface.Services;
using Backend.Models.Contracts.Request;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/questions")]
public class QuestionController : ControllerBase
{
    private readonly IQuestionService _questionService;

    public QuestionController(IQuestionService questionService)
    {
        _questionService = questionService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateQuestion([FromBody] CreateQuestionRequest request)
    {
      var result = await _questionService.CreateQuestion(request);
      
      if (result.IsSuccess) {
        return Ok(new {
            result.Status,
            Message = result.Message ?? "Question has been successfully added to database"
        });
      } else {
        return StatusCode(result.HttpStatusCode ?? 500, new {
            result.Status,
            Message = result.Message?? "Something went wrong, please try again later."
        });
      }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllQuestions()
    {
      var result = await _questionService.GetAllQuestions();
      
      if (result.IsSuccess) {
        return Ok(new {
            Status = result.Status,
            Message = result.Message ?? "Questions fetched successfully",
            Questions = result.Questions
        });
      } else {
        return StatusCode(result.HttpStatusCode ?? 500, new {
            Status = result.Status,
            Message = result.Message ?? "Something went wrong, please try again later."
        });
      }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuestion([FromBody] UpdateQuestionRequest request, int id)
    {
      var result = await _questionService.UpdateQuestion(request, id);

      if (result.IsSuccess) {
        return Ok(new {
            Status = result.Status,
            Message = result.Message ?? "Question updated successfully"
        });
      } else {
        return StatusCode(result.HttpStatusCode ?? 500, new {
            Status = result.Status,
            Message = result.Message ?? "Something went wrong, please try again later."
        });
      }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuestion(int id)
    {
      var result = await _questionService.DeleteQuestion(id);

      if (result.IsSuccess) {
        return Ok(new {
            Status = result.Status,
            Message = result.Message ?? "Question deleted successfully"
        });
      } else {
        return StatusCode(result.HttpStatusCode ?? 500, new {
            Status = result.Status,
            Message = result.Message ?? "Something went wrong, please try again later."
        });
      }
    }
}
