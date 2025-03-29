using Backend.Models.DTOs;

namespace Backend.Models.Contracts.Request;

public class UpdateGameRequest
{
    public required List<CreateGamePlayerDTO> Players { get; set; }
    public int? SequenceId { get; set; }
}
