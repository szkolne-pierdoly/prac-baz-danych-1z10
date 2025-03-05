
namespace Backend.Data.Models;

public class Gra {
  public int Id { get; set; }
  public required string Nazwa { get; set; }
  public virtual required List<Odpowiedz> Odpowiedz { get; set; }
  public required Sekwencja Sekwencja { get; set; }
  public int SekwencjaId { get; set; }
}