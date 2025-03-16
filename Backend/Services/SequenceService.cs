using Backend.Models.Contracts.Request;
using Backend.Data.Models;
using Backend.Interface.Services;
using Backend.Interface.Repositories;
using Backend.Models.ServiceResults.SequenceService;
using Backend.Models.ServiceResults.QuestionService;

namespace Backend.Services;

public class SequenceService : ISequenceService
{
    private readonly ISequenceRepository _sequenceRepository;
    private readonly IQuestionRepository _questionRepository;

    public SequenceService(ISequenceRepository sequenceRepository, IQuestionRepository questionRepository)
    {
        _sequenceRepository = sequenceRepository;
        _questionRepository = questionRepository;
    }

    public async Task<CreateSequenceResult> CreateSequence(CreateSequenceRequest request)
    {
        try
        {
            var questions = new List<Question>();
            if (request.QuestionIds != null)
            {
                foreach (var questionId in request.QuestionIds)
                {
                    var question = await _questionRepository.GetQuestionById(questionId);
                    if (question != null)
                    {
                        questions.Add(question);
                    }
                }
            }
            var newSequence = new Sequence
            {
                Name = request.Name,
                Questions = questions
            };
            await _sequenceRepository.CreateSequence(newSequence);
            return new CreateSequenceResult { IsSuccess = true, Status = "SUCCESS", Message = "Sequence created successfully", Sequence = newSequence };
        }
        catch (Exception ex)
        {
            return new CreateSequenceResult { IsSuccess = false, Status = "ERROR", Message = ex.Message };
        }
    }

    public async Task<GetAllSequencesResult> GetAllSequences()
    {
        try
        {
            var sequences = await _sequenceRepository.GetAllSequences();
            return new GetAllSequencesResult { IsSuccess = true, Status = "SUCCESS", Message = "Sequences retrieved successfully", Sequences = sequences };
        }
        catch (Exception ex)
        {
            return new GetAllSequencesResult { IsSuccess = false, Status = "ERROR", Message = ex.Message };
        }
    }

    public async Task<GetSequenceResult> GetSequence(int id)
    {
        try
        {
            var sequence = await _sequenceRepository.GetSequenceById(id);
            return new GetSequenceResult { IsSuccess = true, Status = "SUCCESS", Message = "Sequence retrieved successfully", Sequence = sequence };
        }
        catch (Exception ex)
        {
            return new GetSequenceResult { IsSuccess = false, Status = "ERROR", Message = ex.Message };
        }
    }

    public async Task<UpdateSequenceResult> UpdateSequence(UpdateSequenceRequest request, int id)
    {
        try
        {
            var sequence = await _sequenceRepository.GetSequenceById(id);
            if (sequence == null)
            {
                return new UpdateSequenceResult
                {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Sequence not found"
                };
            }
            sequence.Name = request.Name;
            var questions = new List<Question>();
            foreach (var questionId in request.QuestionIds)
            {
                var question = await _questionRepository.GetQuestionById(questionId);
                if (question != null)
                {
                    questions.Add(question);
                }
            }
            sequence.Questions = questions;
            await _sequenceRepository.UpdateSequence(sequence);
            return new UpdateSequenceResult
            {
                IsSuccess = true,
                Status = "SUCCESS",
                Message = "Sequence updated successfully",
                Sequence = sequence
            };
        }
        catch (Exception ex)
        {
            return new UpdateSequenceResult
            {
                IsSuccess = false,
                Status = "ERROR",
                Message = ex.Message
            };
        }
    }

    public async Task<BaseResult> DeleteSequence(int id)
    {
        try
        {
            await _sequenceRepository.DeleteSequence(id);
            return new BaseResult { IsSuccess = true, Status = "SUCCESS", Message = "Sequence deleted successfully" };
        }
        catch (Exception ex)
        {
            return new BaseResult { IsSuccess = false, Status = "ERROR", Message = ex.Message };
        }
    }
}
