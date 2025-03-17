
namespace Backend.Data.Models;

public class Sequence
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public virtual ICollection<Game> Games { get; set; } = new List<Game>();
    public virtual ICollection<SequenceQuestion> Part1Questions { get; set; } = new List<SequenceQuestion>();
    public virtual ICollection<SequenceQuestion> Part2Questions { get; set; } = new List<SequenceQuestion>();
    public virtual ICollection<SequenceQuestion> Part3Questions { get; set; } = new List<SequenceQuestion>();
}