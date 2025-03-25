
using Backend.Interface.Repositories;
using Backend.Interface.Services;
using Backend.Models.ServiceResults.ApiService;

namespace Backend.Services;

public class ApiService : IApiService
{
    private readonly IQuestionRepository _questionRepository;
    private readonly ISequenceRepository _sequenceRepository;
    private readonly IPlayerRepository _playerRepository;
    private readonly IGameRepository _gameRepository;

    public ApiService(IQuestionRepository questionRepository, ISequenceRepository sequenceRepository, IPlayerRepository playerRepository, IGameRepository gameRepository)
    {
        _questionRepository = questionRepository;
        _sequenceRepository = sequenceRepository;
        _playerRepository = playerRepository;
        _gameRepository = gameRepository;
    }

    public async Task<GetStatsResult> GetStats()
    {
        try {
            var totalQuestions = await _questionRepository.GetTotalQuestions();
            var totalSequences = await _sequenceRepository.GetTotalSequences();
            var totalPlayers = await _playerRepository.GetTotalPlayers();
            var totalGames = await _gameRepository.GetTotalGames();

            return new GetStatsResult
            {
                IsSuccess = true,
                Status = "SUCCESS",
                Message = "Stats fetched successfully",
                TotalQuestions = totalQuestions,
                TotalSequences = totalSequences,
                TotalPlayers = totalPlayers,
                TotalGames = totalGames
            };
        }
        catch (Exception ex)
        {
            return new GetStatsResult
            {
                IsSuccess = false,
                Status = "ERROR",
                Message = ex.Message
            };
        }
    }
}
