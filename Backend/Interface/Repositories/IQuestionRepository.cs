
using Backend.Data.Models;

namespace Backend.Interface.Repositories;

public interface IQuestionRepository
{
    Task CreateQuestion(Question question);
    Task CreateMultipleQuestions(List<Question> questions);
    Task<Question?> GetQuestionById(int id);
    Task<IEnumerable<Question>> GetAllQuestions();
    Task UpdateQuestion(Question question);
    Task DeleteQuestion(int id);
}
