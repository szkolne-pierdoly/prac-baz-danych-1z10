using Backend.Models.Contracts.Request;
using Backend.Interface.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/sequences")]
public class SequenceController : ControllerBase
{
    private readonly ISequenceService _sequenceService;

    public SequenceController(ISequenceService sequenceService)
    {
        _sequenceService = sequenceService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateSequence([FromBody] CreateSequenceRequest request)
    {
        var result = await _sequenceService.CreateSequence(request);

        if (result.IsSuccess)
        {
            return Ok(new
            {
                result.Status,
                Message = result.Message ?? "Sequence has been successfully added to database",
                Sequence = result.Sequence
            });
        }
        else
        {
            return StatusCode(result.HttpStatusCode ?? 500, new
            {
                result.Status,
                Message = result.Message ?? "Something went wrong, please try again later."
            });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllSequences()
    {
        var result = await _sequenceService.GetAllSequences();

        if (result.IsSuccess)
        {
            return Ok(new
            {
                Status = result.Status,
                Message = result.Message ?? "Sequences fetched successfully",
                Sequences = result.Sequences
            });
        }
        else
        {
            return StatusCode(result.HttpStatusCode ?? 500, new
            {
                Status = result.Status,
                Message = result.Message ?? "Something went wrong, please try again later."
            });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSequence(int id)
    {
        var result = await _sequenceService.GetSequence(id);

        if (result.IsSuccess && result.Sequence != null)
        {
            return Ok(new
            {
                Status = result.Status,
                Message = result.Message ?? "Sequence fetched successfully",
                Sequence = result.Sequence
            });
        }
        else
        {
            return StatusCode(result.HttpStatusCode ?? 500, new
            {
                Status = result.Status,
                Message = result.Message ?? "Something went wrong, please try again later."
            });
        }
    }

    [HttpGet("{id}/questions")]
    public async Task<IActionResult> GetSequenceQuestions(int id)
    {
        var result = await _sequenceService.GetSequenceQuestions(id);

        if (result.IsSuccess)
        {
            return Ok(new
            {
                Status = result.Status,
                Message = result.Message ?? "Sequence questions fetched successfully",
                Part1 = result.Part1,
                Part2 = result.Part2,
                Part3 = result.Part3
            });
        }
        else
        {
            return StatusCode(result.HttpStatusCode ?? 500, new
            {
                Status = result.Status,
                Message = result.Message ?? "Something went wrong, please try again later."
            });
        }
    }

    [HttpGet("{id}/part/{part}/questions")]
    public async Task<IActionResult> GetSequenceQuestionsPart(int id, int part)
    {
        if (part != 1 && part != 2 && part != 3)
        {
            return BadRequest("Invalid part number");
        }

        var result = await _sequenceService.GetSequenceQuestionsPart(id, part);

        if (result.IsSuccess)
        {
            return Ok(new
            {
                Status = result.Status,
                Message = result.Message ?? "Sequence questions part fetched successfully",
                Questions = result.Questions
            });
        }
        else
        {
            return StatusCode(result.HttpStatusCode ?? 500, new
            {
                Status = result.Status,
                Message = result.Message ?? "Something went wrong, please try again later."
            });
        }
    }

    [HttpPut("{id}/part/{part}/question/{question}")]
    public async Task<IActionResult> UpdateSequenceQuestion(int id, int part, int question, [FromBody] UpdateSequenceQuestionRequest request)
    {
        var result = await _sequenceService.UpdateSequenceQuestion(id, part, question, request);

        if (result.IsSuccess)
        {
            return Ok(new
            {
                Status = result.Status,
                Message = result.Message ?? "Sequence question updated successfully",
                SequenceQuestion = result.SequenceQuestion
            });
        }
        else
        {
            return StatusCode(result.HttpStatusCode ?? 500, new
            {
                Status = result.Status,
                Message = result.Message ?? "Something went wrong, please try again later."
            });
        }
    }

    [HttpPut("{id}/part/{part}/clean")]
    public async Task<IActionResult> CleanSequencePartOrder(int id, int part)
    {
        var result = await _sequenceService.CleanSequencePartOrder(id, part);

        if (result.IsSuccess)
        {
            return Ok(new
            {
                Status = result.Status,
                Message = result.Message ?? "Sequence part order cleaned successfully"
            });
        }
        else
        {
            return StatusCode(result.HttpStatusCode ?? 500, new
            {
                Status = result.Status,
                Message = result.Message ?? "Something went wrong, please try again later."
            });
        }
    }

    [HttpPut("{id}/part/{part}/questions/{question}/reorder")]
    public async Task<IActionResult> ReorderSequenceQuestion(int id, int part, int question, [FromBody] ReorderSequenceQuestionRequest request)
    {
        var result = await _sequenceService.ReorderSequenceQuestion(id, part, question, request);

        if (result.IsSuccess)
        {
            return Ok(new
            {
                Status = result.Status,
                Message = result.Message ?? "Sequence question reordered successfully"
            });
        }
        else
        {
            return StatusCode(result.HttpStatusCode ?? 500, new
            {
                Status = result.Status,
                Message = result.Message ?? "Something went wrong, please try again later."
            });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSequence([FromBody] UpdateSequenceRequest request, int id)
    {
        var result = await _sequenceService.UpdateSequence(request, id);

        if (result.IsSuccess)
        {
            return Ok(new
            {
                Status = result.Status,
                Message = result.Message ?? "Sequence updated successfully",
                Sequence = result.Sequence
            });
        }
        else
        {
            return StatusCode(result.HttpStatusCode ?? 500, new
            {
                Status = result.Status,
                Message = result.Message ?? "Something went wrong, please try again later."
            });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSequence(int id)
    {
        var result = await _sequenceService.DeleteSequence(id);

        if (result.IsSuccess)
        {
            return Ok(new
            {
                Status = result.Status,
                Message = result.Message ?? "Sequence deleted successfully"
            });
        }
        else
        {
            return StatusCode(result.HttpStatusCode ?? 500, new
            {
                Status = result.Status,
                Message = result.Message ?? "Something went wrong, please try again later."
            });
        }
    }
}
