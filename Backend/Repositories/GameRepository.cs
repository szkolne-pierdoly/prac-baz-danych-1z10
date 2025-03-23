using Backend.Data;
using Backend.Data.Models;
using Backend.Interface.Repositories;

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
}
