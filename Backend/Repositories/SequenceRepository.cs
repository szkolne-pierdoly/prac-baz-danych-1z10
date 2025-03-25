using Backend.Data;
using Backend.Data.Models;
using Backend.Interface.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class SequenceRepository : ISequenceRepository
{
    private readonly AppDbContext _context;

    public SequenceRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task CreateSequence(Sequence sequence)
    {
        await _context.Sequences.AddAsync(sequence);
        await _context.SaveChangesAsync();
    }

    public async Task<Sequence?> GetSequenceById(int id)
    {
        return await _context.Sequences
            .Include(s => s.Questions)
                .ThenInclude(sq => sq.Question)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<IEnumerable<Sequence>> GetAllSequences(bool includeQuestions, string? search = null, int? page = null, int? pageSize = null)
    {
        var query = _context.Sequences.AsQueryable();

        if (includeQuestions)
        {
            query = query.Include(s => s.Questions)
                                .ThenInclude(sq => sq.Question);
        }

        if (!string.IsNullOrEmpty(search))
        {
            var searchLower = search.ToLower();
            query = query.Where(s =>
                s.Name.ToLower().Contains(searchLower) ||
                (includeQuestions && s.Questions.Any(sq =>
                    sq.Question.Content.ToLower().Contains(searchLower) ||
                    sq.Question.Hint.ToLower().Contains(searchLower) ||
                    sq.Question.CorrectAnswer.ToLower().Contains(searchLower) ||
                    (sq.Question.Hint2 != null && sq.Question.Hint2.ToLower().Contains(searchLower))
                ))
            );

            query = query.OrderByDescending(s => s.Name.ToLower().Contains(searchLower))
                         .ThenBy(s => s.Name); // Secondary sort for consistent ordering
        } else {
            query = query.OrderBy(s => s.Name); // Default sort when no search
        }


        if (page.HasValue && pageSize.HasValue)
        {
            return await query
                .Skip((page.Value - 1) * pageSize.Value)
                .Take(pageSize.Value)
                .ToListAsync();
        }
        else
        {
            return await query.ToListAsync();
        }
    }

    public async Task UpdateSequence(Sequence sequence)
    {
        _context.Sequences.Update(sequence);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteSequence(int id)
    {
        var sequence = await GetSequenceById(id);
        if (sequence != null)
        {
            _context.Sequences.Remove(sequence);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<int> GetTotalSequences()
    {
        return await _context.Sequences.CountAsync();
    }
}