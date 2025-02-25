using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string host = Environment.GetEnvironmentVariable("POSTGRES_HOST");
string port = Environment.GetEnvironmentVariable("POSTGRES_PORT");
string database = Environment.GetEnvironmentVariable("POSTGRES_DB");
string username = Environment.GetEnvironmentVariable("POSTGRES_USER");
string password = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD");

string connectionString = $"Host={host};Port={port};Database={database};Username={username};Password={password}";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();