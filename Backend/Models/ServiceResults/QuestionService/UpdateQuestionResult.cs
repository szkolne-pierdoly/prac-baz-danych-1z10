using Backend.Data.Models;

namespace Backend.Models.ServiceResults.QuestionService;

public class UpdateQuestionResult : BaseResult
{
    public Question? Question { get; set; }
}
