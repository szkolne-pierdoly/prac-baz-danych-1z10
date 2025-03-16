
using Backend.Models.Contracts.Request;
using Backend.Models.ServiceResults.PlayerService;

namespace Backend.Interface.Services;

public interface IPlayerService
{
    Task<CreatePlayerResult> CreatePlayer(CreatePlayerRequest request);
    Task<GetAllPlayersResult> GetAllPlayers();
    Task<GetPlayerByIdResult> GetPlayerById(int id);
    Task<BaseResult> UpdatePlayer(UpdatePlayerRequest request, int id);
    Task<BaseResult> DeletePlayer(int id);
    Task<BaseResult> DeleteMultiplePlayers(int[] ids);
}