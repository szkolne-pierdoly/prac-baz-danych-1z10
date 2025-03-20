using Backend.Data.Models;

namespace Backend.Models.ServiceResults.QuestionService;

public class GetAllQuestionsResult : BaseResult
{
    public IEnumerable<Question>? Questions { get; set; }
    public int? TotalItems { get; set; }
}
