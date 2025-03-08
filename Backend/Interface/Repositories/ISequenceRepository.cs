
using Backend.Data.Models;

namespace Backend.Interface.Repositories;

public interface ISequenceRepository
{
    Task CreateSequence(Sequence sequence);
    Task<Sequence?> GetSequenceById(int id);
}
