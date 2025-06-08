using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace asp_net_core_project.Migrations
{
    /// <inheritdoc />
    public partial class UpdateHousingType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<List<string>>(
                name: "HousingTypes",
                table: "MaintenanceTasks",
                type: "text[]",
                nullable: false,
                oldClrType: typeof(int[]),
                oldType: "integer[]");

            migrationBuilder.AlterColumn<string>(
                name: "HousingType",
                table: "AccountInformations",
                type: "text",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int[]>(
                name: "HousingTypes",
                table: "MaintenanceTasks",
                type: "integer[]",
                nullable: false,
                oldClrType: typeof(List<string>),
                oldType: "text[]");

            migrationBuilder.AlterColumn<int>(
                name: "HousingType",
                table: "AccountInformations",
                type: "integer",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
