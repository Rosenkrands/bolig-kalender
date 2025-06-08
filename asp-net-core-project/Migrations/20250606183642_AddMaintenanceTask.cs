using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace asp_net_core_project.Migrations
{
    /// <inheritdoc />
    public partial class AddMaintenanceTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HousingType",
                table: "AccountInformations",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HousingType",
                table: "AccountInformations");
        }
    }
}
