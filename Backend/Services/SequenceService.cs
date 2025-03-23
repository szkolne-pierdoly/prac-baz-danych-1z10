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

    public async Task<GetAllSequencesResult> GetAllSequences(bool includeQuestions)
    {
        try
        {
            var sequences = await _sequenceRepository.GetAllSequences(includeQuestions);
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

            var questionsInPart = sequence.Questions.Where(q => q.SequencePart == sequencePart).OrderBy(q => q.Order).ToList();

            if (request.QuestionId == -1)
            {
                var questionToRemove = questionsInPart.FirstOrDefault(q => q.Order == questionIndex);
                if (questionToRemove != null)
                {
                    sequence.Questions.Remove(questionToRemove);
                    foreach (var sQuestion in questionsInPart.Where(q => q.Order > questionIndex).OrderBy(q => q.Order))
                    {
                        sQuestion.Order--;
                    }
                }

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

            var existingQuestion = questionsInPart.FirstOrDefault(q => q.Order == questionIndex);
            if (existingQuestion != null)
            {
                sequence.Questions.Remove(existingQuestion);
                // Shift all subsequent questions up
                foreach (var questionToShift in questionsInPart.Where(q => q.Order > questionIndex).OrderBy(q => q.Order))
                {
                    questionToShift.Order--;
                }
            }

            sequence.Questions.Add(sequenceQuestion);

            // Fill any gaps in the order
            var updatedQuestionsInPart = sequence.Questions.Where(q => q.SequencePart == sequencePart).OrderBy(q => q.Order).ToList();
            for (int i = 0; i < updatedQuestionsInPart.Count; i++)
            {
                updatedQuestionsInPart[i].Order = i + 1;
            }

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

    private async Task AlignQuestionsInSequence(int sequenceId, int part)
    {
        var sequence = await _sequenceRepository.GetSequenceById(sequenceId);
        if (sequence == null)
        {
            return;
        }

        SequencePart sequencePart = part == 1 ? SequencePart.Part1 : part == 2 ? SequencePart.Part2 : SequencePart.Part3;

        var questionsInPart = sequence.Questions
            .Where(q => q.SequencePart == sequencePart)
            .OrderBy(q => q.Order)
            .ToList();

        for (int i = 0; i < questionsInPart.Count; i++)
        {
            questionsInPart[i].Order = i + 1;
        }

        await _sequenceRepository.UpdateSequence(sequence);
    }

    public async Task<BaseResult> ReorderSequenceQuestion(int sequenceId, int part, int question, ReorderSequenceQuestionRequest request)
    {
        try
        {
            var sequence = await _sequenceRepository.GetSequenceById(sequenceId);
            if (sequence == null)
            {
                return new BaseResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Sequence not found"
                };
            }
            else if (sequence.Questions.Count == 0)
            {
                return new BaseResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Sequence is empty"
                };
            }

            var sequencePart = part == 1 ? SequencePart.Part1 : part == 2 ? SequencePart.Part2 : SequencePart.Part3;

            var questionsInPart = sequence.Questions.Where(q => q.SequencePart == sequencePart).OrderBy(q => q.Order).ToList();

            var oldQuestion = questionsInPart.FirstOrDefault(q => q.Order == question);
            if (oldQuestion != null)
            {
                if (question > request.MoveTo)
                {
                    foreach (var questionToShift in questionsInPart.Where(q => q.Order >= request.MoveTo && q.Order < question).OrderByDescending(q => q.Order))
                    {
                        questionToShift.Order++;
                    }
                }
                else
                {
                    foreach (var questionToShift in questionsInPart.Where(q => q.Order <= request.MoveTo && q.Order > question).OrderBy(q => q.Order))
                    {
                        questionToShift.Order--;
                    }
                }

                oldQuestion.Order = request.MoveTo;

                await _sequenceRepository.UpdateSequence(sequence);

                return new BaseResult { IsSuccess = true, Status = "SUCCESS", Message = "Sequence question reordered successfully" };
            }
            else
            {
                return new BaseResult {
                    IsSuccess = false,
                    Status = "ERROR",
                    Message = "Question not found in the specified part"
                };
            }
        }
        catch (Exception ex)
        {
            return new BaseResult { IsSuccess = false, Status = "ERROR", Message = ex.Message };
        }
    }

    public async Task<UpdateSequenceResult> UpdateSequence(UpdateSequenceRequest request, int id)
    {
        try
        {
            if (request == null || (string.IsNullOrEmpty(request.Name) && request.Part1QuestionIds == null && request.Part2QuestionIds == null && request.Part3QuestionIds == null))
            {
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

            // Update sequence name if provided
            if (!string.IsNullOrEmpty(request.Name))
            {
                sequence.Name = request.Name;
            }

            // Update questions only if new question IDs are provided
            if (request.Part1QuestionIds != null || request.Part2QuestionIds != null || request.Part3QuestionIds != null)
            {
                var newQuestions = new List<SequenceQuestion>();

                if (request.Part1QuestionIds != null)
                {
                    newQuestions.AddRange(await AddQuestionsToSequence(request.Part1QuestionIds, SequencePart.Part1));
                }
                if (request.Part2QuestionIds != null)
                {
                    newQuestions.AddRange(await AddQuestionsToSequence(request.Part2QuestionIds, SequencePart.Part2));
                }
                if (request.Part3QuestionIds != null)
                {
                    newQuestions.AddRange(await AddQuestionsToSequence(request.Part3QuestionIds, SequencePart.Part3));
                }

                // Remove existing questions that are not in the new list
                sequence.Questions = sequence.Questions.Where(q => !newQuestions.Any(nq => nq.Question.Id == q.Question.Id)).ToList();

                // Add new questions
                sequence.Questions.AddRangeExtension(newQuestions);

                // Reorder questions
                ReorderQuestions(sequence);
            }

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

    private async Task<List<SequenceQuestion>> AddQuestionsToSequence(List<int> questionIds, SequencePart part)
    {
        var questions = new List<SequenceQuestion>();
        for (int i = 0; i < questionIds.Count; i++)
        {
            var question = await _questionRepository.GetQuestionById(questionIds[i]);
            if (question != null)
            {
                questions.Add(new SequenceQuestion
                {
                    Question = question,
                    SequencePart = part,
                    Order = i + 1
                });
            }
        }
        return questions;
    }

    private void ReorderQuestions(Sequence sequence)
    {
        foreach (var part in new[] { SequencePart.Part1, SequencePart.Part2, SequencePart.Part3 })
        {
            var partQuestions = sequence.Questions.Where(q => q.SequencePart == part).OrderBy(q => q.Order).ToList();
            for (int i = 0; i < partQuestions.Count; i++)
            {
                partQuestions[i].Order = i + 1;
            }
        }
    }

    public async Task<BaseResult> CleanSequencePartOrder(int id, int part)
    {
        try
        {
            var sequence = await _sequenceRepository.GetSequenceById(id);
            if (sequence == null)
            {
                return new BaseResult { IsSuccess = false, Status = "ERROR", Message = "Sequence not found" };
            }

            SequencePart sequencePart = part == 1 ? SequencePart.Part1 : part == 2 ? SequencePart.Part2 : SequencePart.Part3;

            var questionsInPart = sequence.Questions
                .Where(q => q.SequencePart == sequencePart)
                .OrderBy(q => q.Order)
                .ToList();

            for (int i = 0; i < questionsInPart.Count; i++)
            {
                questionsInPart[i].Order = i + 1;
            }

            sequence.Questions = sequence.Questions
                .Where(q => q.SequencePart != sequencePart)
                .Concat(questionsInPart)
                .ToList();

            await _sequenceRepository.UpdateSequence(sequence);

            return new BaseResult { IsSuccess = true, Status = "SUCCESS", Message = "Sequence part order cleaned successfully" };
        }
        catch (Exception ex)
        {
            return new BaseResult { IsSuccess = false, Status = "ERROR", Message = ex.Message };
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

public static class CollectionExtensions
{
    public static void AddRangeExtension<T>(this ICollection<T> destination, IEnumerable<T> source)
    {
        foreach (var item in source)
        {
            destination.Add(item);
        }
    }
}
