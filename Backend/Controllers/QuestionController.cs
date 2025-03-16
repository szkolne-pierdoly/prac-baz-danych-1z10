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
            Message = result.Message ?? "Question has been successfully added to database",
            Question = result.Question
        });
      } else {
        return StatusCode(result.HttpStatusCode ?? 500, new {
            result.Status,
            Message = result.Message?? "Something went wrong, please try again later."
        });
      }
    }

    [HttpPost("import")]
    public async Task<IActionResult> ImportQuestions([FromForm] ImportQuestionsRequest request)
    {
      var result = await _questionService.ImportQuestions(request);

      if (result.IsSuccess) {
        return Ok(new {
            Status = result.Status,
            Message = result.Message ?? "Questions imported successfully",
            Questions = result.Questions
        });
      } else {
        return StatusCode(result.HttpStatusCode ?? 500, new {
            Status = result.Status,
            Message = result.Message ?? "Something went wrong, please try again later."
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
            Message = result.Message ?? "Question updated successfully",
            Question = result.Question
        });
      } else {
        return StatusCode(result.HttpStatusCode ?? 500, new {
            Status = result.Status,
            Message = result.Message ?? "Something went wrong, please try again later."
        });
      }
    }

    [HttpDelete("{ids}")]
    public async Task<IActionResult> DeleteQuestion(string ids)
    {
      IActionResult result;
      if (ids.Contains(','))
      {
        var multiResult = await _questionService.DeleteMultipleQuestions(ids);
        result = multiResult.IsSuccess ? Ok(new { Status = multiResult.Status, Message = multiResult.Message ?? "Questions deleted successfully" }) : StatusCode(multiResult.HttpStatusCode ?? 500, new { Status = multiResult.Status, Message = multiResult.Message ?? "Something went wrong, please try again later." });
      }
      else
      {
        if (int.TryParse(ids, out int id))
        {
          var singleResult = await _questionService.DeleteQuestion(id);
          result = singleResult.IsSuccess ? Ok(new { Status = singleResult.Status, Message = singleResult.Message ?? "Question deleted successfully" }) : StatusCode(singleResult.HttpStatusCode ?? 500, new { Status = singleResult.Status, Message = singleResult.Message ?? "Something went wrong, please try again later." });
        }
        else
        {
          result = StatusCode(400, new { Status = "ERROR", Message = "Invalid question ID format." });
        }
      }
      return result;
    }
}
