using Backend.Data;
using Backend.Data.Models;
using Backend.Interface.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class QuestionRepository : IQuestionRepository
{
    private readonly AppDbContext _context;

    public QuestionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task CreateMultipleQuestions(List<Question> questions)
    {
        await _context.Questions.AddRangeAsync(questions);
        await _context.SaveChangesAsync();
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

    public async Task<IEnumerable<Question>> GetAllQuestions(string? search = null)
    {
        var query = _context.Questions.AsQueryable();

        if (!string.IsNullOrEmpty(search))
        {
            query = query.Where(q => q.Content.Contains(search));
        }
        return await query.ToListAsync();
    }

    public async Task<IEnumerable<Question>> GetQuestions(int page = 1, int pageSize = 10, string? search = null)
    {
        var query = _context.Questions.AsQueryable();

        if (!string.IsNullOrEmpty(search))
        {
            query = query.Where(q => q.Content.Contains(search) || q.Hint.Contains(search) || q.CorrectAnswer.Contains(search) || q.Hint2 != null && q.Hint2.Contains(search));
        }

        return await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
    }

    public async Task UpdateQuestion(Question question)
    {
        _context.Entry(question).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteQuestion(int id)
    {
        var question = await GetQuestionById(id);
        if (question != null)
        {
            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();
        }
    }

    public async Task DeleteMultipleQuestions(int[] ids)
    {
        var questions = await _context.Questions.Where(q => ids.Contains(q.Id)).ToListAsync();
        _context.Questions.RemoveRange(questions);
        await _context.SaveChangesAsync();
    }

    public async Task<int> GetTotalQuestions()
    {
        return await _context.Questions.CountAsync();
    }
}
