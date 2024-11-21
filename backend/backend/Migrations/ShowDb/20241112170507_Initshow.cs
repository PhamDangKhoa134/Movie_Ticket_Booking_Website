using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations.ShowDb
{
    /// <inheritdoc />
    public partial class Initshow : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "show");

            migrationBuilder.CreateTable(
                name: "ShoBooking",
                schema: "show",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreateOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    TotalPrice = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoBooking", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ShoTimeFrame",
                schema: "show",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoTimeFrame", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ShoShow",
                schema: "show",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CinemaId = table.Column<int>(type: "int", nullable: false),
                    MovieId = table.Column<int>(type: "int", nullable: false),
                    TimeFrameId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoShow", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShoShow_ShoTimeFrame_TimeFrameId",
                        column: x => x.TimeFrameId,
                        principalSchema: "show",
                        principalTable: "ShoTimeFrame",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ShoShowSeat",
                schema: "show",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CinemaHSId = table.Column<int>(type: "int", nullable: false),
                    ShowId = table.Column<int>(type: "int", nullable: false),
                    BookingId = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoShowSeat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShoShowSeat_ShoBooking_BookingId",
                        column: x => x.BookingId,
                        principalSchema: "show",
                        principalTable: "ShoBooking",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ShoShowSeat_ShoShow_ShowId",
                        column: x => x.ShowId,
                        principalSchema: "show",
                        principalTable: "ShoShow",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ShoShow_TimeFrameId",
                schema: "show",
                table: "ShoShow",
                column: "TimeFrameId");

            migrationBuilder.CreateIndex(
                name: "IX_ShoShowSeat_BookingId",
                schema: "show",
                table: "ShoShowSeat",
                column: "BookingId");

            migrationBuilder.CreateIndex(
                name: "IX_ShoShowSeat_ShowId",
                schema: "show",
                table: "ShoShowSeat",
                column: "ShowId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShoShowSeat",
                schema: "show");

            migrationBuilder.DropTable(
                name: "ShoBooking",
                schema: "show");

            migrationBuilder.DropTable(
                name: "ShoShow",
                schema: "show");

            migrationBuilder.DropTable(
                name: "ShoTimeFrame",
                schema: "show");
        }
    }
}
