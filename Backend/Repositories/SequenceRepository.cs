using Backend.Data; 
using Backend.Data.Models;
using Backend.Interface.Repositories;

namespace Backend.Repositories;

public class SequenceRepository : ISequenceRepository
{
    private readonly AppDbContext _context;

    public SequenceRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Sequence?> GetSequenceById(int id)
    {
        return await _context.Sequences.FindAsync(id);
    }

    public async Task CreateSequence(Sequence sequence)
    {
        await _context.Sequences.AddAsync(sequence);
        await _context.SaveChangesAsync();
    }
}