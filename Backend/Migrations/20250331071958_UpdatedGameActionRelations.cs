using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedGameActionRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GameAction_Players_PlayerId",
                table: "GameAction");

            migrationBuilder.DropForeignKey(
                name: "FK_GameAction_Questions_QuestionId",
                table: "GameAction");

            migrationBuilder.AddColumn<int>(
                name: "GameId1",
                table: "GameAction",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_GameAction_GameId1",
                table: "GameAction",
                column: "GameId1");

            migrationBuilder.AddForeignKey(
                name: "FK_GameAction_Games_GameId1",
                table: "GameAction",
                column: "GameId1",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GameAction_Players_PlayerId",
                table: "GameAction",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_GameAction_Questions_QuestionId",
                table: "GameAction",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GameAction_Games_GameId1",
                table: "GameAction");

            migrationBuilder.DropForeignKey(
                name: "FK_GameAction_Players_PlayerId",
                table: "GameAction");

            migrationBuilder.DropForeignKey(
                name: "FK_GameAction_Questions_QuestionId",
                table: "GameAction");

            migrationBuilder.DropIndex(
                name: "IX_GameAction_GameId1",
                table: "GameAction");

            migrationBuilder.DropColumn(
                name: "GameId1",
                table: "GameAction");

            migrationBuilder.AddForeignKey(
                name: "FK_GameAction_Players_PlayerId",
                table: "GameAction",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GameAction_Questions_QuestionId",
                table: "GameAction",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id");
        }
    }
}
