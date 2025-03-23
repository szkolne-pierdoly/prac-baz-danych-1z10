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

    public async Task<List<Game>> GetAllGames()
    {
        return await _context.Games.ToListAsync();
    }

    public async Task<Game?> GetGameById(int id)
    {
        return await _context.Games.FindAsync(id);
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
}
