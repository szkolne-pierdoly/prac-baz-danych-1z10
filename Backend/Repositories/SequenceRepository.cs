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
        return await _context.Sequences.Include(s => s.Part1Questions).Include(s => s.Part2Questions).Include(s => s.Part3Questions).FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<IEnumerable<Sequence>> GetAllSequences()
    {
        return await _context.Sequences.Include(s => s.Part1Questions).Include(s => s.Part2Questions).Include(s => s.Part3Questions).ToListAsync();
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