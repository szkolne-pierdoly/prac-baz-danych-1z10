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
      await _questionService.CreateQuestion(request);
      return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetAllQuestions()
    {
      var result = await _questionService.GetAllQuestions();
      return Ok(result);
    }
}
