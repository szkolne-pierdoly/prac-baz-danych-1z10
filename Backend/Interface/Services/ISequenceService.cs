
using Backend.Contracts.Request;

namespace Backend.Interface.Services;

public interface ISequenceService
{
    Task<BaseResult> CreateSequence(CreateSequenceRequest request);
}
