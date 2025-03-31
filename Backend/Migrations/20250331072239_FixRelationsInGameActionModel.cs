using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class FixRelationsInGameActionModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GameAction_Games_GameId1",
                table: "GameAction");

            migrationBuilder.DropIndex(
                name: "IX_GameAction_GameId1",
                table: "GameAction");

            migrationBuilder.DropColumn(
                name: "GameId1",
                table: "GameAction");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
        }
    }
}
