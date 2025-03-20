using Backend.Data.Models;

namespace Backend.Interface.Repositories;

public interface IQuestionRepository
{
    Task CreateQuestion(Question question);
    Task CreateMultipleQuestions(List<Question> questions);
    Task<Question?> GetQuestionById(int id);
    Task<IEnumerable<Question>> GetAllQuestions(string? search = null, int? ignoreInSequence = null);
    Task<IEnumerable<Question>> GetQuestions(int page = 1, int pageSize = 10, string? search = null, int? ignoreInSequence = null);
    Task<int> GetTotalItems(string? search = null);
    Task UpdateQuestion(Question question);
    Task DeleteQuestion(int id);
    Task DeleteMultipleQuestions(int[] ids);
    Task<int> GetTotalQuestions();
}
