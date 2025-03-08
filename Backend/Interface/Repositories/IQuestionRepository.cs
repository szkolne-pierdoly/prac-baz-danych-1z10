
using Backend.Data.Models;

namespace Backend.Interface.Repositories;

public interface IQuestionRepository
{
    Task CreateQuestion(Question question);
    Task<Question?> GetQuestionById(int id);
}
