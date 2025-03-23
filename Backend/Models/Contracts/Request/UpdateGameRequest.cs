namespace Backend.Models.Contracts.Request;

public class UpdateGameRequest
{
    public List<int>? PlayerIds { get; set; }
    public int? SequenceId { get; set; }
}
