using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedRelationsToGameAction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GameAction_GamePlayer_GamePlayerId",
                table: "GameAction");

            migrationBuilder.DropIndex(
                name: "IX_GameAction_GamePlayerId",
                table: "GameAction");

            migrationBuilder.DropColumn(
                name: "GamePlayerId",
                table: "GameAction");

            migrationBuilder.AddForeignKey(
                name: "FK_GameAction_GamePlayer_PlayerId",
                table: "GameAction",
                column: "PlayerId",
                principalTable: "GamePlayer",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GameAction_GamePlayer_PlayerId",
                table: "GameAction");

            migrationBuilder.AddColumn<int>(
                name: "GamePlayerId",
                table: "GameAction",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_GameAction_GamePlayerId",
                table: "GameAction",
                column: "GamePlayerId");

            migrationBuilder.AddForeignKey(
                name: "FK_GameAction_GamePlayer_GamePlayerId",
                table: "GameAction",
                column: "GamePlayerId",
                principalTable: "GamePlayer",
                principalColumn: "Id");
        }
    }
}
