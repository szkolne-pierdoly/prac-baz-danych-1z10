using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedMissingGameRelatedModelsDatasets : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GameAction_GamePlayer_GamePlayerId",
                table: "GameAction");

            migrationBuilder.DropForeignKey(
                name: "FK_GameAction_Games_GameId",
                table: "GameAction");

            migrationBuilder.DropForeignKey(
                name: "FK_GameAction_SequenceQuestions_SequencesQuestionId",
                table: "GameAction");

            migrationBuilder.DropForeignKey(
                name: "FK_GamePlayer_Games_GameId",
                table: "GamePlayer");

            migrationBuilder.DropForeignKey(
                name: "FK_GamePlayer_Players_PlayerId",
                table: "GamePlayer");

            migrationBuilder.DropForeignKey(
                name: "FK_GamePlayer_Players_PlayerId1",
                table: "GamePlayer");

            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GamePlayer",
                table: "GamePlayer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GameAction",
                table: "GameAction");

            migrationBuilder.RenameTable(
                name: "GamePlayer",
                newName: "GamePlayers");

            migrationBuilder.RenameTable(
                name: "GameAction",
                newName: "GameActions");

            migrationBuilder.RenameIndex(
                name: "IX_GamePlayer_PlayerId1",
                table: "GamePlayers",
                newName: "IX_GamePlayers_PlayerId1");

            migrationBuilder.RenameIndex(
                name: "IX_GamePlayer_PlayerId",
                table: "GamePlayers",
                newName: "IX_GamePlayers_PlayerId");

            migrationBuilder.RenameIndex(
                name: "IX_GamePlayer_GameId",
                table: "GamePlayers",
                newName: "IX_GamePlayers_GameId");

            migrationBuilder.RenameIndex(
                name: "IX_GameAction_SequencesQuestionId",
                table: "GameActions",
                newName: "IX_GameActions_SequencesQuestionId");

            migrationBuilder.RenameIndex(
                name: "IX_GameAction_GamePlayerId",
                table: "GameActions",
                newName: "IX_GameActions_GamePlayerId");

            migrationBuilder.RenameIndex(
                name: "IX_GameAction_GameId",
                table: "GameActions",
                newName: "IX_GameActions_GameId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GamePlayers",
                table: "GamePlayers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GameActions",
                table: "GameActions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GameActions_GamePlayers_GamePlayerId",
                table: "GameActions",
                column: "GamePlayerId",
                principalTable: "GamePlayers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_GameActions_Games_GameId",
                table: "GameActions",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GameActions_SequenceQuestions_SequencesQuestionId",
                table: "GameActions",
                column: "SequencesQuestionId",
                principalTable: "SequenceQuestions",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_GamePlayers_Games_GameId",
                table: "GamePlayers",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GamePlayers_Players_PlayerId",
                table: "GamePlayers",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GamePlayers_Players_PlayerId1",
                table: "GamePlayers",
                column: "PlayerId1",
                principalTable: "Players",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GameActions_GamePlayers_GamePlayerId",
                table: "GameActions");

            migrationBuilder.DropForeignKey(
                name: "FK_GameActions_Games_GameId",
                table: "GameActions");

            migrationBuilder.DropForeignKey(
                name: "FK_GameActions_SequenceQuestions_SequencesQuestionId",
                table: "GameActions");

            migrationBuilder.DropForeignKey(
                name: "FK_GamePlayers_Games_GameId",
                table: "GamePlayers");

            migrationBuilder.DropForeignKey(
                name: "FK_GamePlayers_Players_PlayerId",
                table: "GamePlayers");

            migrationBuilder.DropForeignKey(
                name: "FK_GamePlayers_Players_PlayerId1",
                table: "GamePlayers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GamePlayers",
                table: "GamePlayers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GameActions",
                table: "GameActions");

            migrationBuilder.RenameTable(
                name: "GamePlayers",
                newName: "GamePlayer");

            migrationBuilder.RenameTable(
                name: "GameActions",
                newName: "GameAction");

            migrationBuilder.RenameIndex(
                name: "IX_GamePlayers_PlayerId1",
                table: "GamePlayer",
                newName: "IX_GamePlayer_PlayerId1");

            migrationBuilder.RenameIndex(
                name: "IX_GamePlayers_PlayerId",
                table: "GamePlayer",
                newName: "IX_GamePlayer_PlayerId");

            migrationBuilder.RenameIndex(
                name: "IX_GamePlayers_GameId",
                table: "GamePlayer",
                newName: "IX_GamePlayer_GameId");

            migrationBuilder.RenameIndex(
                name: "IX_GameActions_SequencesQuestionId",
                table: "GameAction",
                newName: "IX_GameAction_SequencesQuestionId");

            migrationBuilder.RenameIndex(
                name: "IX_GameActions_GamePlayerId",
                table: "GameAction",
                newName: "IX_GameAction_GamePlayerId");

            migrationBuilder.RenameIndex(
                name: "IX_GameActions_GameId",
                table: "GameAction",
                newName: "IX_GameAction_GameId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GamePlayer",
                table: "GamePlayer",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GameAction",
                table: "GameAction",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    QuestionId = table.Column<int>(type: "integer", nullable: false),
                    Points = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Answers_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answers_QuestionId",
                table: "Answers",
                column: "QuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_GameAction_GamePlayer_GamePlayerId",
                table: "GameAction",
                column: "GamePlayerId",
                principalTable: "GamePlayer",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_GameAction_Games_GameId",
                table: "GameAction",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GameAction_SequenceQuestions_SequencesQuestionId",
                table: "GameAction",
                column: "SequencesQuestionId",
                principalTable: "SequenceQuestions",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_GamePlayer_Games_GameId",
                table: "GamePlayer",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GamePlayer_Players_PlayerId",
                table: "GamePlayer",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GamePlayer_Players_PlayerId1",
                table: "GamePlayer",
                column: "PlayerId1",
                principalTable: "Players",
                principalColumn: "Id");
        }
    }
}
