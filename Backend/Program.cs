using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Interface.Repositories;
using Backend.Repositories;
using Backend.Interface.Services;
using Backend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IApiService, ApiService>();
builder.Services.AddScoped<IQuestionRepository, QuestionRepository>();
builder.Services.AddScoped<ISequenceRepository, SequenceRepository>();
builder.Services.AddScoped<IPlayerRepository, PlayerRepository>();
builder.Services.AddScoped<ISequenceService, SequenceService>();
builder.Services.AddScoped<IQuestionService, QuestionService>();
builder.Services.AddScoped<IPlayerService, PlayerService>();

string host = Environment.GetEnvironmentVariable("POSTGRES_HOST") ?? "localhost";
string port = Environment.GetEnvironmentVariable("POSTGRES_PORT") ?? "5432";
string database = Environment.GetEnvironmentVariable("POSTGRES_DB") ?? "mydb";
string username = Environment.GetEnvironmentVariable("POSTGRES_USER") ?? "postgres";
string password = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD") ?? "password";

string connectionString = $"Host={host};Port={port};Database={database};Username={username};Password={password}";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    //Add this to allow all origins only in development
    app.UseCors(policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();