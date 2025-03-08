using Microsoft.EntityFrameworkCore;
using Backend.Data.Models;

namespace Backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            string host = Environment.GetEnvironmentVariable("POSTGRES_HOST") ?? "localhost";
            string port = Environment.GetEnvironmentVariable("POSTGRES_PORT") ?? "5432";
            string dbName = Environment.GetEnvironmentVariable("POSTGRES_DB") ?? "mydb";
            string username = Environment.GetEnvironmentVariable("POSTGRES_USER") ?? "postgres";
            string password = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD") ?? "password";

            string connectionString = $"Host={host};Port={port};Database={dbName};Username={username};Password={password};";
            optionsBuilder.UseNpgsql(connectionString);
        }
    }

    public DbSet<Question> Questions { get; set; }
    public DbSet<Sequence> Sequences { get; set; }
    public DbSet<Player> Players { get; set; }
    public DbSet<Game> Games { get; set; }
    public DbSet<Answer> Answers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Question>().HasKey(q => q.Id);
        modelBuilder.Entity<Sequence>().HasKey(s => s.Id);
        modelBuilder.Entity<Player>().HasKey(p => p.Id);
        modelBuilder.Entity<Game>().HasKey(g => g.Id);
        modelBuilder.Entity<Answer>().HasKey(a => a.Id);

        modelBuilder.Entity<Sequence>()
            .HasMany(s => s.Questions)
            .WithMany();

        modelBuilder.Entity<Game>()
            .HasOne(g => g.Sequence)
            .WithMany(s => s.Games)
            .HasForeignKey(g => g.SequenceId);

        modelBuilder.Entity<Answer>()
            .HasOne(a => a.question)
            .WithMany()
            .HasForeignKey(a => a.QuestionId);

        modelBuilder.Entity<Player>()
            .HasMany(p => p.Games)
            .WithOne(g => g.Player)
            .HasForeignKey(g => g.PlayerId);

        modelBuilder.Entity<Game>()
            .HasOne(g => g.Sequence)
            .WithMany(s => s.Games)
            .HasForeignKey(g => g.SequenceId);

        modelBuilder.Entity<Answer>()
            .HasOne(a => a.question)
            .WithMany()
            .HasForeignKey(a => a.QuestionId);
            
            
    }
}
