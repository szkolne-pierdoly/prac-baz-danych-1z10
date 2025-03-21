using Backend.Models.Contracts.Request;
using Backend.Data.Models;
using Backend.Interface.Services;
using Backend.Interface.Repositories;
using Backend.Models.ServiceResults.SequenceService;
using Backend.Models.ServiceResults.QuestionService;
using Backend.Data.Enum;
using Microsoft.AspNetCore.Mvc;

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
            var newSequence = new Sequence
            {
                Name = request.Name
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

    public async Task<GetSequenceQuestionsResult> GetSequenceQuestions(int id)
    {
        try
        {
            var sequence = await _sequenceRepository.GetSequenceById(id);
            if (sequence == null)
            {
                return new GetSequenceQuestionsResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Sequence not found"
                };
            }
            return new GetSequenceQuestionsResult {
                IsSuccess = true,
                Status = "SUCCESS",
                Message = "Sequence questions retrieved successfully",
                Part1 = sequence.Questions.Where(q => q.SequencePart == SequencePart.Part1).ToList(),
                Part2 = sequence.Questions.Where(q => q.SequencePart == SequencePart.Part2).ToList(),
                Part3 = sequence.Questions.Where(q => q.SequencePart == SequencePart.Part3).ToList()
            };
        }
        catch (Exception ex)
        {
            return new GetSequenceQuestionsResult {
                IsSuccess = false,
                Status = "ERROR",
                Message = ex.Message
            };
        }
    }

    public async Task<GetSequencePartQuestionResult> GetSequenceQuestionsPart(int id, int part)
    {
        try
        {
            var sequence = await _sequenceRepository.GetSequenceById(id);
            if (sequence == null)
            {
                return new GetSequencePartQuestionResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Sequence not found",
                    HttpStatusCode = 404
                };
            }
            if (part == 1)
            {
                return new GetSequencePartQuestionResult {
                    IsSuccess = true,
                    Status = "SUCCESS",
                    Message = "Sequence part 1 questions retrieved successfully",
                    Questions = sequence.Questions.Where(q => q.SequencePart == SequencePart.Part1).ToList()
                };
            }
            else if (part == 2)
            {
                return new GetSequencePartQuestionResult {
                    IsSuccess = true,
                    Status = "SUCCESS",
                    Message = "Sequence part 2 questions retrieved successfully",
                    Questions = sequence.Questions.Where(q => q.SequencePart == SequencePart.Part2).ToList()
                };
            }
            else if (part == 3)
            {
                return new GetSequencePartQuestionResult {
                    IsSuccess = true,
                    Status = "SUCCESS",
                    Message = "Sequence part 3 questions retrieved successfully",
                    Questions = sequence.Questions.Where(q => q.SequencePart == SequencePart.Part3).ToList()
                };
            }
            else
            {
                return new GetSequencePartQuestionResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Invalid part number"
                };
            }
        }
        catch (Exception ex)
        {
            return new GetSequencePartQuestionResult {
                IsSuccess = false,
                Status = "ERROR",
                Message = ex.Message,
                HttpStatusCode = 500
            };
        }
    }

    public async Task<UpdateSequenceQuestionResult> UpdateSequenceQuestion(int sequenceId, int part, int questionIndex, UpdateSequenceQuestionRequest request)
    {
        try
        {
            if (part < 1 || part > 3)
            {
                return new UpdateSequenceQuestionResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Invalid part number"
                };
            }

            SequencePart sequencePart = part == 1 ? SequencePart.Part1 : part == 2 ? SequencePart.Part2 : SequencePart.Part3;

            var sequence = await _sequenceRepository.GetSequenceById(sequenceId);
            if (sequence == null)
            {
                return new UpdateSequenceQuestionResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Sequence not found",
                    HttpStatusCode = 404
                };
            }

            if (request.QuestionId == -1)
            {
                sequence.Questions.Remove(sequence.Questions.FirstOrDefault(q => q.SequencePart == sequencePart && q.Order == questionIndex));

                await _sequenceRepository.UpdateSequence(sequence);
                
                return new UpdateSequenceQuestionResult {
                    IsSuccess = true,
                    Status = "SUCCESS",
                    Message = "Sequence question removed successfully"
                };
            }

            var question = await _questionRepository.GetQuestionById(request.QuestionId);
            if (question == null)
            {
                return new UpdateSequenceQuestionResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Question not found",
                    HttpStatusCode = 404
                };
            }

            var sequenceQuestion = new SequenceQuestion {
                Question = question,
                SequencePart = sequencePart,
                Order = questionIndex
            };

            foreach (var existingQuestion in sequence.Questions.ToList())
            {
                if (existingQuestion.Order == questionIndex && existingQuestion.SequencePart == sequencePart)
                {
                    sequence.Questions.Remove(existingQuestion);
                }
            }
            sequence.Questions.Add(sequenceQuestion);

            await _sequenceRepository.UpdateSequence(sequence);

            return new UpdateSequenceQuestionResult {
                IsSuccess = true,
                Status = "SUCCESS",
                Message = "Sequence question updated successfully",
                SequenceQuestion = sequenceQuestion
            };
        }
        catch (Exception ex)
        {
            return new UpdateSequenceQuestionResult {
                IsSuccess = false,
                Status = "ERROR",
                Message = ex.Message,
                HttpStatusCode = 500
            };
        }
    }

    public async Task<UpdateSequenceResult> UpdateSequence(UpdateSequenceRequest request, int id)
    {
        try
        {
            if (request != null && string.IsNullOrEmpty(request.Name) && request.Part1QuestionIds == null && request.Part2QuestionIds == null && request.Part3QuestionIds == null) {
                return new UpdateSequenceResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "No data provided"
                };
            }

            var sequence = await _sequenceRepository.GetSequenceById(id);
            if (sequence == null)
            {
                return new UpdateSequenceResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Sequence not found",
                    HttpStatusCode = 404
                };
            }

            if (request?.Name != null && request.Name != "")
                sequence.Name = request.Name;

            var part1Questions = new List<SequenceQuestion>();
            var part2Questions = new List<SequenceQuestion>();
            var part3Questions = new List<SequenceQuestion>();

            if (request?.Part1QuestionIds != null && request.Part1QuestionIds.Count > 0) {
                foreach (var questionId in request.Part1QuestionIds) {
                    var question = await _questionRepository.GetQuestionById(questionId);
                    if (question != null) {
                        var sequenceQuestion = new SequenceQuestion {
                            Question = question,
                            SequencePart = SequencePart.Part1,
                            Order = part1Questions.Count + 1
                        };
                        part1Questions.Add(sequenceQuestion);
                    }
                }
            }
            if (request?.Part2QuestionIds != null && request.Part2QuestionIds.Count > 0) {
                foreach (var questionId in request.Part2QuestionIds) {
                    var question = await _questionRepository.GetQuestionById(questionId);
                    if (question != null) {
                        var sequenceQuestion = new SequenceQuestion {
                            Question = question,
                            SequencePart = SequencePart.Part2,
                            Order = part2Questions.Count + 1
                        };
                        part2Questions.Add(sequenceQuestion);
                    }
                }
            }
            if (request?.Part3QuestionIds != null && request.Part3QuestionIds.Count > 0) {
                foreach (var questionId in request.Part3QuestionIds) {
                    var question = await _questionRepository.GetQuestionById(questionId);
                    if (question != null) {
                        var sequenceQuestion = new SequenceQuestion {
                            Question = question,
                            SequencePart = SequencePart.Part3,
                            Order = part3Questions.Count + 1
                        };
                        part3Questions.Add(sequenceQuestion);
                    }
                }
            }

            sequence.Questions = part1Questions.Concat(part2Questions).Concat(part3Questions).ToList();
            await _sequenceRepository.UpdateSequence(sequence);
            return new UpdateSequenceResult {
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
