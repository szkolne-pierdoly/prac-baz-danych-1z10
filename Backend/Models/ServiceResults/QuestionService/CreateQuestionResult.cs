using Backend.Data.Models;

namespace Backend.Models.ServiceResults.QuestionService;

public class CreateQuestionResult : BaseResult
{
    public Question? Question { get; set; }
}