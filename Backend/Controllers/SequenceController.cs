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
      
      if (result.IsSuccess) {
        return Ok(new {
            result.Status,
            Message = result.Message ?? "Sequence has been successfully added to database",
            Sequence = result.Sequence
        });
      } else {
        return StatusCode(result.HttpStatusCode ?? 500, new {
            result.Status,
            Message = result.Message?? "Something went wrong, please try again later."
        });
      }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllSequences()
    {
      var result = await _sequenceService.GetAllSequences();
      
      if (result.IsSuccess) {
        return Ok(new {
            Status = result.Status,
            Message = result.Message ?? "Sequences fetched successfully",
            Sequences = result.Sequences
        });
      } else {
        return StatusCode(result.HttpStatusCode ?? 500, new {
            Status = result.Status,
            Message = result.Message ?? "Something went wrong, please try again later."
        });
      }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSequence(int id)
    {
      var result = await _sequenceService.GetSequence(id);

      if (result.IsSuccess && result.Sequence != null) {
        return Ok(new {
            Status = result.Status,
            Message = result.Message ?? "Sequence fetched successfully",
            Sequence = result.Sequence
        });
      } else {
        return StatusCode(result.HttpStatusCode ?? 500, new {
            Status = result.Status,
            Message = result.Message ?? "Something went wrong, please try again later."
        });
      }
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSequence([FromBody] UpdateSequenceRequest request, int id)
    {
      var result = await _sequenceService.UpdateSequence(request, id);

      if (result.IsSuccess) {
        return Ok(new {
            Status = result.Status,
            Message = result.Message ?? "Sequence updated successfully",
            Sequence = result.Sequence
        });
      } else {
        return StatusCode(result.HttpStatusCode ?? 500, new {
            Status = result.Status,
            Message = result.Message ?? "Something went wrong, please try again later."
        });
      }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSequence(int id)
    {
      var result = await _sequenceService.DeleteSequence(id);

      if (result.IsSuccess) {
        return Ok(new {
            Status = result.Status,
            Message = result.Message ?? "Sequence deleted successfully"
        });
      } else {
        return StatusCode(result.HttpStatusCode ?? 500, new {
            Status = result.Status,
            Message = result.Message ?? "Something went wrong, please try again later."
        });
      }
    }
}
