using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSequenceModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuestionSequence");

            migrationBuilder.CreateTable(
                name: "SequenceQuestion",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    QuestionId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SequenceQuestion", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SequenceQuestion_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SequenceSequenceQuestion",
                columns: table => new
                {
                    Part1QuestionsId = table.Column<int>(type: "integer", nullable: false),
                    SequenceId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SequenceSequenceQuestion", x => new { x.Part1QuestionsId, x.SequenceId });
                    table.ForeignKey(
                        name: "FK_SequenceSequenceQuestion_SequenceQuestion_Part1QuestionsId",
                        column: x => x.Part1QuestionsId,
                        principalTable: "SequenceQuestion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SequenceSequenceQuestion_Sequences_SequenceId",
                        column: x => x.SequenceId,
                        principalTable: "Sequences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SequenceSequenceQuestion1",
                columns: table => new
                {
                    Part2QuestionsId = table.Column<int>(type: "integer", nullable: false),
                    Sequence1Id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SequenceSequenceQuestion1", x => new { x.Part2QuestionsId, x.Sequence1Id });
                    table.ForeignKey(
                        name: "FK_SequenceSequenceQuestion1_SequenceQuestion_Part2QuestionsId",
                        column: x => x.Part2QuestionsId,
                        principalTable: "SequenceQuestion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SequenceSequenceQuestion1_Sequences_Sequence1Id",
                        column: x => x.Sequence1Id,
                        principalTable: "Sequences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SequenceSequenceQuestion2",
                columns: table => new
                {
                    Part3QuestionsId = table.Column<int>(type: "integer", nullable: false),
                    Sequence2Id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SequenceSequenceQuestion2", x => new { x.Part3QuestionsId, x.Sequence2Id });
                    table.ForeignKey(
                        name: "FK_SequenceSequenceQuestion2_SequenceQuestion_Part3QuestionsId",
                        column: x => x.Part3QuestionsId,
                        principalTable: "SequenceQuestion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SequenceSequenceQuestion2_Sequences_Sequence2Id",
                        column: x => x.Sequence2Id,
                        principalTable: "Sequences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SequenceQuestion_QuestionId",
                table: "SequenceQuestion",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_SequenceSequenceQuestion_SequenceId",
                table: "SequenceSequenceQuestion",
                column: "SequenceId");

            migrationBuilder.CreateIndex(
                name: "IX_SequenceSequenceQuestion1_Sequence1Id",
                table: "SequenceSequenceQuestion1",
                column: "Sequence1Id");

            migrationBuilder.CreateIndex(
                name: "IX_SequenceSequenceQuestion2_Sequence2Id",
                table: "SequenceSequenceQuestion2",
                column: "Sequence2Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SequenceSequenceQuestion");

            migrationBuilder.DropTable(
                name: "SequenceSequenceQuestion1");

            migrationBuilder.DropTable(
                name: "SequenceSequenceQuestion2");

            migrationBuilder.DropTable(
                name: "SequenceQuestion");

            migrationBuilder.CreateTable(
                name: "QuestionSequence",
                columns: table => new
                {
                    QuestionsId = table.Column<int>(type: "integer", nullable: false),
                    SequenceId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionSequence", x => new { x.QuestionsId, x.SequenceId });
                    table.ForeignKey(
                        name: "FK_QuestionSequence_Questions_QuestionsId",
                        column: x => x.QuestionsId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuestionSequence_Sequences_SequenceId",
                        column: x => x.SequenceId,
                        principalTable: "Sequences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuestionSequence_SequenceId",
                table: "QuestionSequence",
                column: "SequenceId");
        }
    }
}
