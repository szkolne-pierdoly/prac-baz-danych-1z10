
namespace Backend.Data.Models
{
    public class SequenceQuestion
    {
        public int Id { get; set; }
        public required int Order { get; set; }
        public required Question Question { get; set; }
        public int QuestionId { get; set; }
    }
}