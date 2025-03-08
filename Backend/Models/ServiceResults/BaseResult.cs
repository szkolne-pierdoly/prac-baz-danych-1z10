
public class BaseResult
{
    public required bool IsSuccess { get; set; }
    public required string Status { get; set; }
    public string? Message { get; set; }
    public int? HttpStatusCode { get; set; }
}

