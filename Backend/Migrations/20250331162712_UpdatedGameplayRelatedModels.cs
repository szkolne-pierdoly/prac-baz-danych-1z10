using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedGameplayRelatedModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GameAction_Questions_QuestionId",
                table: "GameAction");

            migrationBuilder.RenameColumn(
                name: "QuestionId",
                table: "GameAction",
                newName: "SequencesQuestionId");

            migrationBuilder.RenameColumn(
                name: "Points",
                table: "GameAction",
                newName: "PointsGained");

            migrationBuilder.RenameIndex(
                name: "IX_GameAction_QuestionId",
                table: "GameAction",
                newName: "IX_GameAction_SequencesQuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_GameAction_SequenceQuestions_SequencesQuestionId",
                table: "GameAction",
                column: "SequencesQuestionId",
                principalTable: "SequenceQuestions",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GameAction_SequenceQuestions_SequencesQuestionId",
                table: "GameAction");

            migrationBuilder.RenameColumn(
                name: "SequencesQuestionId",
                table: "GameAction",
                newName: "QuestionId");

            migrationBuilder.RenameColumn(
                name: "PointsGained",
                table: "GameAction",
                newName: "Points");

            migrationBuilder.RenameIndex(
                name: "IX_GameAction_SequencesQuestionId",
                table: "GameAction",
                newName: "IX_GameAction_QuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_GameAction_Questions_QuestionId",
                table: "GameAction",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
