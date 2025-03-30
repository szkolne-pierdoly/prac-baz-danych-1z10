using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class RenamedHintsToVariantsInQuestion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Hint2",
                table: "Questions",
                newName: "Variant3");

            migrationBuilder.RenameColumn(
                name: "Hint",
                table: "Questions",
                newName: "Variant2");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Variant3",
                table: "Questions",
                newName: "Hint2");

            migrationBuilder.RenameColumn(
                name: "Variant2",
                table: "Questions",
                newName: "Hint");
        }
    }
}
