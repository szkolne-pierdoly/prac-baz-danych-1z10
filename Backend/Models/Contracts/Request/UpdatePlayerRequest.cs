
namespace Backend.Models.Contracts.Request;

public class UpdatePlayerRequest
{
    public required string Name { get; set; }
    public required string Color { get; set; }
}