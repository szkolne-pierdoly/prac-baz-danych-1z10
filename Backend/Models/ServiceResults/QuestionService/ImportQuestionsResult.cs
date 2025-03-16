
using Backend.Data.Models;

namespace Backend.Models.ServiceResults.QuestionService;

public class ImportQuestionsResult : BaseResult
{
    public List<Question>? Questions { get; set; }
}
