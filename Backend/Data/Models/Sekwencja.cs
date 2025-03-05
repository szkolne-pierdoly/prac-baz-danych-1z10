
namespace Backend.Data.Models;

public class Sekwencja {
  public int Id { get; set; }
  public required string Nazwa { get; set; }
  public required List<Pytanie> Pytania { get; set; }
}