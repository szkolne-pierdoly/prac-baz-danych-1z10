
using Backend.Data.Models;

namespace Backend.Interface.Repositories;

public interface IPlayerRepository
{
    Task<Player> CreatePlayer(Player player);
    Task<IEnumerable<Player>> GetAllPlayers();
    Task<Player?> GetPlayerById(int id);
    Task UpdatePlayer(Player player);
    Task DeletePlayer(int id);
    Task DeleteMultiplePlayers(int[] ids);
    Task<int> GetTotalPlayers();
}
