
using Backend.Models.DTOs;

namespace Backend.Models.Contracts.Request;

public class CreateSequenceRequest
{
    public required string Name { get; set; }
}