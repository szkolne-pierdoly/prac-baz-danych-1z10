
using Backend.Data;
using Backend.Data.Models;
using Backend.Interface.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class PlayerRepository : IPlayerRepository
{
    private readonly AppDbContext _context;

    public PlayerRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Player> CreatePlayer(Player player)
    {
        await _context.Players.AddAsync(player);
        await _context.SaveChangesAsync();
        return player;
    }

    public async Task<IEnumerable<Player>> GetAllPlayers()
    {
        return await _context.Players.ToListAsync();
    }

    public async Task<Player?> GetPlayerById(int id)
    {
        return await _context.Players.FindAsync(id);
    }

    public async Task UpdatePlayer(Player player)
    {
        _context.Players.Update(player);
        await _context.SaveChangesAsync();
    }

    public async Task DeletePlayer(int id)
    {
        var player = await GetPlayerById(id);
        if (player != null)
        {
            _context.Players.Remove(player);
            await _context.SaveChangesAsync();
        }
    }

    public async Task DeleteMultiplePlayers(int[] ids)
    {
        var players = await _context.Players.Where(p => ids.Contains(p.Id)).ToListAsync();
        _context.Players.RemoveRange(players);
        await _context.SaveChangesAsync();
    }

    public async Task<int> GetTotalPlayers()
    {
        return await _context.Players.CountAsync();
    }
}
