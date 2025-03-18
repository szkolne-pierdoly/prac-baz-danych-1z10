using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class restructuredSequenceModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SequenceQuestion_Questions_QuestionId",
                table: "SequenceQuestion");

            migrationBuilder.DropTable(
                name: "SequenceSequenceQuestion");

            migrationBuilder.DropTable(
                name: "SequenceSequenceQuestion1");

            migrationBuilder.DropTable(
                name: "SequenceSequenceQuestion2");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SequenceQuestion",
                table: "SequenceQuestion");

            migrationBuilder.RenameTable(
                name: "SequenceQuestion",
                newName: "SequenceQuestions");

            migrationBuilder.RenameIndex(
                name: "IX_SequenceQuestion_QuestionId",
                table: "SequenceQuestions",
                newName: "IX_SequenceQuestions_QuestionId");

            migrationBuilder.AddColumn<int>(
                name: "SequenceId",
                table: "SequenceQuestions",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SequencePart",
                table: "SequenceQuestions",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SequenceQuestions",
                table: "SequenceQuestions",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_SequenceQuestions_SequenceId",
                table: "SequenceQuestions",
                column: "SequenceId");

            migrationBuilder.AddForeignKey(
                name: "FK_SequenceQuestions_Questions_QuestionId",
                table: "SequenceQuestions",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SequenceQuestions_Sequences_SequenceId",
                table: "SequenceQuestions",
                column: "SequenceId",
                principalTable: "Sequences",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SequenceQuestions_Questions_QuestionId",
                table: "SequenceQuestions");

            migrationBuilder.DropForeignKey(
                name: "FK_SequenceQuestions_Sequences_SequenceId",
                table: "SequenceQuestions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SequenceQuestions",
                table: "SequenceQuestions");

            migrationBuilder.DropIndex(
                name: "IX_SequenceQuestions_SequenceId",
                table: "SequenceQuestions");

            migrationBuilder.DropColumn(
                name: "SequenceId",
                table: "SequenceQuestions");

            migrationBuilder.DropColumn(
                name: "SequencePart",
                table: "SequenceQuestions");

            migrationBuilder.RenameTable(
                name: "SequenceQuestions",
                newName: "SequenceQuestion");

            migrationBuilder.RenameIndex(
                name: "IX_SequenceQuestions_QuestionId",
                table: "SequenceQuestion",
                newName: "IX_SequenceQuestion_QuestionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SequenceQuestion",
                table: "SequenceQuestion",
                column: "Id");

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

            migrationBuilder.AddForeignKey(
                name: "FK_SequenceQuestion_Questions_QuestionId",
                table: "SequenceQuestion",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
