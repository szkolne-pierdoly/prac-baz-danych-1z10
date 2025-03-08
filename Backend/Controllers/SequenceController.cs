using Backend.Contracts.Request;
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
      await _sequenceService.CreateSequence(request);
      return Ok();
    }
}
