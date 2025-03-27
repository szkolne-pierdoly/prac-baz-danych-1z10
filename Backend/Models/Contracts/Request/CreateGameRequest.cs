using Backend.Models.DTOs;

namespace Backend.Models.Contracts.Request;

public class CreateGameRequest
{
    public string? Name { get; set; }
    public required int SequenceId { get; set; }
    public required List<CreateGamePlayerDTO> Players { get; set; }
}