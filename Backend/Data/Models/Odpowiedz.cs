
namespace Backend.Data.Models;

public class Odpowiedz {
  public int Id { get; set; }
  public required int PytanieId { get; set; }
  public required Pytanie pytanie { get; set; }
  public required int Punkty { get; set; }
}