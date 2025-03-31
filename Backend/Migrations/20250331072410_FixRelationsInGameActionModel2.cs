using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class FixRelationsInGameActionModel2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GameAction_GamePlayer_PlayerId",
                table: "GameAction");

            migrationBuilder.DropForeignKey(
                name: "FK_GameAction_Players_PlayerId",
                table: "GameAction");

            migrationBuilder.RenameColumn(
                name: "PlayerId",
                table: "GameAction",
                newName: "GamePlayerId");

            migrationBuilder.RenameIndex(
                name: "IX_GameAction_PlayerId",
                table: "GameAction",
                newName: "IX_GameAction_GamePlayerId");

            migrationBuilder.AddForeignKey(
                name: "FK_GameAction_GamePlayer_GamePlayerId",
                table: "GameAction",
                column: "GamePlayerId",
                principalTable: "GamePlayer",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GameAction_GamePlayer_GamePlayerId",
                table: "GameAction");

            migrationBuilder.RenameColumn(
                name: "GamePlayerId",
                table: "GameAction",
                newName: "PlayerId");

            migrationBuilder.RenameIndex(
                name: "IX_GameAction_GamePlayerId",
                table: "GameAction",
                newName: "IX_GameAction_PlayerId");

            migrationBuilder.AddForeignKey(
                name: "FK_GameAction_GamePlayer_PlayerId",
                table: "GameAction",
                column: "PlayerId",
                principalTable: "GamePlayer",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GameAction_Players_PlayerId",
                table: "GameAction",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
