
namespace Backend.Data.Models;

public class Sequence
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public virtual required ICollection<Question> Questions { get; set; }
    public virtual ICollection<Game> Games { get; set; } = new List<Game>();
}