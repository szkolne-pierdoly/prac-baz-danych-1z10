using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedPlayerModelToGamePlayer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PlayerId1",
                table: "GamePlayer",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "QuestionId",
                table: "GameAction",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_GamePlayer_PlayerId1",
                table: "GamePlayer",
                column: "PlayerId1");

            migrationBuilder.CreateIndex(
                name: "IX_GameAction_QuestionId",
                table: "GameAction",
                column: "QuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_GameAction_Questions_QuestionId",
                table: "GameAction",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GamePlayer_Players_PlayerId1",
                table: "GamePlayer",
                column: "PlayerId1",
                principalTable: "Players",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GameAction_Questions_QuestionId",
                table: "GameAction");

            migrationBuilder.DropForeignKey(
                name: "FK_GamePlayer_Players_PlayerId1",
                table: "GamePlayer");

            migrationBuilder.DropIndex(
                name: "IX_GamePlayer_PlayerId1",
                table: "GamePlayer");

            migrationBuilder.DropIndex(
                name: "IX_GameAction_QuestionId",
                table: "GameAction");

            migrationBuilder.DropColumn(
                name: "PlayerId1",
                table: "GamePlayer");

            migrationBuilder.DropColumn(
                name: "QuestionId",
                table: "GameAction");
        }
    }
}
