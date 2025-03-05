
namespace Backend.Data.Models;

public class Pytanie {
    public int Id {get; set;}
    public required string Tresc {get; set;}
    public required string Podpowiedz {get; set;}
    public string? podpowiedz2 {get; set;}
    public required string PoprawnaOdpowiedz {get; set;}
}