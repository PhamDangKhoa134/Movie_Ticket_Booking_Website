using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations.CinemaDb
{
    /// <inheritdoc />
    public partial class InitCinema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "cinema");

            migrationBuilder.CreateTable(
                name: "CinCinemaHall",
                schema: "cinema",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TotalSeats = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CinCinemaHall", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CinTypeSeat",
                schema: "cinema",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    HolidayPrice = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CinTypeSeat", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CinCinemaHallSeat",
                schema: "cinema",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SeatRow = table.Column<int>(type: "int", nullable: false),
                    SeatColumn = table.Column<int>(type: "int", nullable: false),
                    TypeID = table.Column<int>(type: "int", nullable: false),
                    CinemaID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CinCinemaHallSeat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CinCinemaHallSeat_CinCinemaHall_CinemaID",
                        column: x => x.CinemaID,
                        principalSchema: "cinema",
                        principalTable: "CinCinemaHall",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CinCinemaHallSeat_CinTypeSeat_TypeID",
                        column: x => x.TypeID,
                        principalSchema: "cinema",
                        principalTable: "CinTypeSeat",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CinCinemaHallSeat_CinemaID",
                schema: "cinema",
                table: "CinCinemaHallSeat",
                column: "CinemaID");

            migrationBuilder.CreateIndex(
                name: "IX_CinCinemaHallSeat_TypeID",
                schema: "cinema",
                table: "CinCinemaHallSeat",
                column: "TypeID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CinCinemaHallSeat",
                schema: "cinema");

            migrationBuilder.DropTable(
                name: "CinCinemaHall",
                schema: "cinema");

            migrationBuilder.DropTable(
                name: "CinTypeSeat",
                schema: "cinema");
        }
    }
}
