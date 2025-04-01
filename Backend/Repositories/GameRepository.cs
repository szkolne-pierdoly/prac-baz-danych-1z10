using Backend.Data;
using Backend.Data.Models;
using Backend.Interface.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class GameRepository : IGameRepository
{
    private readonly AppDbContext _context;

    public GameRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Game> CreateGame(Game game)
    {
        await _context.Games.AddAsync(game);
        await _context.SaveChangesAsync();
        return game;
    }

    public async Task<List<Game>> GetAllGames(bool includePlayers = false, bool includeActions = false, bool includeSequence = false, int? limit = null, int? offset = null, string? search = null)
    {
        IQueryable<Game> query = _context.Games
            .Include(g => g.Sequence);

        if (includePlayers)
            query = query.Include(g => g.Players);
        if (includeActions)
            query = query.Include(g => g.Actions);
        if (includeSequence)
            query = query.Include(g => g.Sequence);

        if (search != null)
        {
            string searchQuery = search.ToLower(); // For case-insensitive search

            query = query.Where(g =>
                   g.Name != null && g.Name.ToLower().Contains(searchQuery) || // Search in Game Name
                   g.Sequence.Name.ToLower().Contains(searchQuery) || // Search in Sequence Name
                   g.Players.Any(p => p.Name.ToLower().Contains(searchQuery)) // Search in Player Names
               )
                .OrderByDescending(g => g.Name != null && g.Name.ToLower().StartsWith(searchQuery)) // Prioritize Name matches
                .ThenBy(g => g.Name); // Then order by Name for secondary sorting
        }
        else
            query = query.OrderBy(g => g.Name); // Default ordering when no search
        if (offset.HasValue)
        {
            if (limit.HasValue)
                query = query.Skip(offset.Value);
            else
            {
                query = query.Skip(offset.Value).Take(10);
                limit = 10;
            }
        }
        if (limit.HasValue)
            query = query.Take(limit.Value);


        return await query.ToListAsync();
    }

    public async Task<Game?> GetGameById(int id)
    {
        return await _context.Games
             .Include(g => g.Sequence)
             .ThenInclude(s => s.Questions)
             .ThenInclude(q => q.Question)
             .Include(g => g.Players)
             .ThenInclude(p => p.Player)
             .Include(g => g.Actions)
             .ThenInclude(a => a.GamePlayer)
             .ThenInclude(gp => gp!.Player)
             .Include(g => g.Actions)
             .ThenInclude(a => a.SequencesQuestion)
             .ThenInclude(sq => sq!.Question)
             .FirstOrDefaultAsync(g => g.Id == id);
    }

    public async Task<Game?> GetGameByTokenHash(string tokenHash)
    {
           return await _context.Games
            .Include(g => g.Sequence)
            .ThenInclude(s => s.Questions)
            .ThenInclude(q => q.Question)
            .Include(g => g.Players)
            .ThenInclude(p => p.Player)
            .Include(g => g.Actions)
            .ThenInclude(a => a.GamePlayer)
            .ThenInclude(gp => gp!.Player)
            .Include(g => g.Actions)
            .ThenInclude(a => a.SequencesQuestion)
            .ThenInclude(sq => sq!.Question)
            .FirstOrDefaultAsync(g => g.GameToken == tokenHash);
    }

    public async Task<Game?> UpdateGame(Game game)
    {
        _context.Games.Update(game);
        await _context.SaveChangesAsync();
        return game;
    }

    public async Task<Game?> DeleteGame(int id)
    {
        var game = await _context.Games.FindAsync(id);
        if (game == null)
        {
            return null;
        }
        _context.Games.Remove(game);
        await _context.SaveChangesAsync();
        return game;
    }

    public async Task<GameAction?> GetGameActionById(int id)
    {
        return await _context.GameActions
            .Include(ga => ga.GamePlayer)
            .Include(ga => ga.SequencesQuestion)
            .ThenInclude(sq => sq!.Question)
            .FirstOrDefaultAsync(ga => ga.Id == id);
    }

    public async Task<int> GetTotalGames()
    {
        return await _context.Games.CountAsync();
    }
}
