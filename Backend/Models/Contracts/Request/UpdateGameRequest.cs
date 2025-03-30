using Backend.Models.DTOs;

namespace Backend.Models.Contracts.Request;

public class UpdateGameRequest
{
    public List<CreateGamePlayerDTO>? Players { get; set; }
    public int? SequenceId { get; set; }
    public string? Name { get; set; }
}
