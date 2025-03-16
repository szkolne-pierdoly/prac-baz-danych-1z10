
using Backend.Data.Models;
using Backend.Interface.Repositories;
using Backend.Interface.Services;
using Backend.Models.Contracts.Request;
using Backend.Models.ServiceResults.PlayerService;

namespace Backend.Services;

public class PlayerService : IPlayerService
{
    private readonly IPlayerRepository _playerRepository;

    public PlayerService(IPlayerRepository playerRepository)
    {
        _playerRepository = playerRepository;
    }

    public async Task<CreatePlayerResult> CreatePlayer(CreatePlayerRequest request)
    {
        try
        {
            var player = new Player { Name = request.Name };
            var createdPlayer = await _playerRepository.CreatePlayer(player);
            
            return new CreatePlayerResult {
              IsSuccess = true,
              Status = "SUCCESS",
              Message = "Player created successfully",
              Player = createdPlayer
            };
        }
        catch (Exception ex)
        {
            return new CreatePlayerResult {
              IsSuccess = false,
              Status = "ERROR",
              Message = ex.Message
            };
        }
    }

    public async Task<GetAllPlayersResult> GetAllPlayers()
    {
        try
        {
            var players = await _playerRepository.GetAllPlayers();
            return new GetAllPlayersResult {
              IsSuccess = true,
              Status = "SUCCESS",
              Message = "Players fetched successfully",
              Players = players
            };
        }
        catch (Exception ex)
        {
            return new GetAllPlayersResult {
                IsSuccess = false,
                Status = "ERROR",
                Message = ex.Message
            };
        }
    }

    public async Task<GetPlayerByIdResult> GetPlayerById(int id)
    {
        try
        {
            var player = await _playerRepository.GetPlayerById(id);
            return new GetPlayerByIdResult {
                IsSuccess = true,
                Status = "SUCCESS",
                Message = "Player fetched successfully",
                Player = player
            };
        }
        catch (Exception ex)
        {
            return new GetPlayerByIdResult {
                IsSuccess = false,
                Status = "ERROR",
                Message = ex.Message
            };
        }
    }

    public async Task<BaseResult> UpdatePlayer(UpdatePlayerRequest request, int id)
    {
        try
        {
            var player = await _playerRepository.GetPlayerById(id);
            if (player == null)
            {
                return new BaseResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Player not found"
                };
            }

            player.Name = request.Name;
            await _playerRepository.UpdatePlayer(player);

            return new BaseResult {
                IsSuccess = true,
                Status = "SUCCESS",
                Message = "Player updated successfully"
            };  
        }
        catch (Exception ex)
        {
            return new BaseResult {
                IsSuccess = false,
                Status = "ERROR",
                Message = ex.Message
            };
        }
    }

    public async Task<BaseResult> DeletePlayer(int id)
    {
        try
        {
            await _playerRepository.DeletePlayer(id);
            return new BaseResult {
                IsSuccess = true,
                Status = "SUCCESS",
                Message = "Player deleted successfully"
            };
        }
        catch (Exception ex)
        {
            return new BaseResult {
                IsSuccess = false,
                Status = "ERROR",
                Message = ex.Message
            };
        }
    }

    public async Task<BaseResult> DeleteMultiplePlayers(int[] ids)
    {
        try
        {
            await _playerRepository.DeleteMultiplePlayers(ids);
            return new BaseResult {
                IsSuccess = true,
                Status = "SUCCESS",
                Message = "Players deleted successfully"
            };
        }
        catch (Exception ex)
        {
            return new BaseResult {
                IsSuccess = false,
                Status = "ERROR",
                Message = ex.Message
            };
        }
    }
}
