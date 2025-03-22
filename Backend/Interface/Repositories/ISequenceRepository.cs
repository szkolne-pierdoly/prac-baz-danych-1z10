
using Backend.Data.Models;

namespace Backend.Interface.Repositories;

public interface ISequenceRepository
{
    Task CreateSequence(Sequence sequence);
    Task<IEnumerable<Sequence>> GetAllSequences(bool includeQuestions);
    Task<Sequence?> GetSequenceById(int id);
    Task UpdateSequence(Sequence sequence);
    Task DeleteSequence(int id);
    Task<int> GetTotalSequences();
}
