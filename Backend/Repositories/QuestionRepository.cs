using Backend.Data;
using Backend.Data.Models;
using Backend.Interface.Repositories;

namespace Backend.Repositories;

public class QuestionRepository : IQuestionRepository
{
    private readonly AppDbContext _context;

    public QuestionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Question?> GetQuestionById(int id)
    {
        return await _context.Questions.FindAsync(id);
    }

    public async Task CreateQuestion(Question question)
    {
        await _context.Questions.AddAsync(question);
        await _context.SaveChangesAsync();
    }
}
