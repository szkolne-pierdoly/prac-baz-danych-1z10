using Backend.Contracts.Request;
using Backend.Data.Models;
using Backend.Interface.Services;
using Backend.Interface.Repositories;
namespace Backend.Services;

public class SequenceService : ISequenceService
{
    private readonly ISequenceRepository _sequenceRepository;

    public SequenceService(ISequenceRepository sequenceRepository)
    {
        _sequenceRepository = sequenceRepository;
    }

    public async Task<BaseResult> CreateSequence(CreateSequenceRequest request)
    {
        try {
            var newSequence = new Sequence
            {
                Name = request.Name,
                Questions = request.Questions.Select(q =>
                    new Question {
                        Content = q.Content,
                        Hint = q.Hint1,
                        hint2 = q.Hint2,
                        CorrectAnswer = q.CorrectAnswer
                    }).ToList()
            };
            await _sequenceRepository.CreateSequence(newSequence);
            return new BaseResult { IsSuccess = true, Status = "SUCCESS", Message = "Sequence created successfully" };
        } catch (Exception ex) {
            return new BaseResult { IsSuccess = false, Status = "ERROR", Message = ex.Message };
        }
    }
}
