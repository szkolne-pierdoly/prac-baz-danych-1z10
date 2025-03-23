namespace Backend.Models.Contracts.Request;

public class StartGameRequest
{
    public required int SequenceId { get; set; }
    public required List<int> PlayerIds { get; set; }
}