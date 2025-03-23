
namespace Backend.Data.Models;

public class Sequence
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public virtual ICollection<SequenceQuestion> Questions { get; set; } = new List<SequenceQuestion>();
}