using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eventifybackend.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "priceModels",
                columns: table => new
                {
                    ModelId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ModelName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_priceModels", x => x.ModelId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "serviceCategories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ServiceCategoryName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_serviceCategories", x => x.CategoryId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Email = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Phone = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProfilePic = table.Column<byte[]>(type: "longblob", nullable: true),
                    HouseNo = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Street = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Road = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    City = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Discriminator = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FirstName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LastName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CompanyName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ContactPersonName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.UserId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "prices",
                columns: table => new
                {
                    Pid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Pname = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BasePrice = table.Column<double>(type: "double", nullable: false),
                    ModelId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_prices", x => x.Pid);
                    table.ForeignKey(
                        name: "FK_prices_priceModels_ModelId",
                        column: x => x.ModelId,
                        principalTable: "priceModels",
                        principalColumn: "ModelId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "serviceAndResources",
                columns: table => new
                {
                    SoRId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsSuspend = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsRequestToDelete = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    overallRate = table.Column<float>(type: "float", nullable: true),
                    Discriminator = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Capacity = table.Column<int>(type: "int", nullable: true),
                    CategoryId = table.Column<int>(type: "int", nullable: true),
                    serviceCategoryCategoryId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_serviceAndResources", x => x.SoRId);
                    table.ForeignKey(
                        name: "FK_serviceAndResources_serviceCategories_serviceCategoryCategor~",
                        column: x => x.serviceCategoryCategoryId,
                        principalTable: "serviceCategories",
                        principalColumn: "CategoryId");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "events",
                columns: table => new
                {
                    EventId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    StartDateTime = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndDateTime = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Location = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    GuestCount = table.Column<int>(type: "int", nullable: false),
                    Thumbnail = table.Column<byte[]>(type: "longblob", nullable: true),
                    ClientId = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_events", x => x.EventId);
                    table.ForeignKey(
                        name: "FK_events_users_ClientId",
                        column: x => x.ClientId,
                        principalTable: "users",
                        principalColumn: "UserId");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "featureAndFacility",
                columns: table => new
                {
                    SORId = table.Column<int>(type: "int", nullable: false),
                    FacilityName = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_featureAndFacility", x => new { x.SORId, x.FacilityName });
                    table.ForeignKey(
                        name: "FK_featureAndFacility_serviceAndResources_SORId",
                        column: x => x.SORId,
                        principalTable: "serviceAndResources",
                        principalColumn: "SoRId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "vendorSRLocation",
                columns: table => new
                {
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false),
                    HouseNo = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Area = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    District = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Country = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    State = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vendorSRLocation", x => new { x.Id, x.LocationId });
                    table.ForeignKey(
                        name: "FK_vendorSRLocation_serviceAndResources_Id",
                        column: x => x.Id,
                        principalTable: "serviceAndResources",
                        principalColumn: "SoRId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "vendorSRPhoto",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    photoId = table.Column<int>(type: "int", nullable: false),
                    Image = table.Column<byte[]>(type: "longblob", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vendorSRPhoto", x => new { x.Id, x.photoId });
                    table.ForeignKey(
                        name: "FK_vendorSRPhoto_serviceAndResources_Id",
                        column: x => x.Id,
                        principalTable: "serviceAndResources",
                        principalColumn: "SoRId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "vendorSRPrices",
                columns: table => new
                {
                    ServiceAndResourceId = table.Column<int>(type: "int", nullable: false),
                    PriceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vendorSRPrices", x => new { x.ServiceAndResourceId, x.PriceId });
                    table.ForeignKey(
                        name: "FK_vendorSRPrices_prices_PriceId",
                        column: x => x.PriceId,
                        principalTable: "prices",
                        principalColumn: "Pid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_vendorSRPrices_serviceAndResources_ServiceAndResourceId",
                        column: x => x.ServiceAndResourceId,
                        principalTable: "serviceAndResources",
                        principalColumn: "SoRId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "vendorSRVideo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    VideoId = table.Column<int>(type: "int", nullable: false),
                    Video = table.Column<byte[]>(type: "longblob", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vendorSRVideo", x => new { x.Id, x.VideoId });
                    table.ForeignKey(
                        name: "FK_vendorSRVideo_serviceAndResources_Id",
                        column: x => x.Id,
                        principalTable: "serviceAndResources",
                        principalColumn: "SoRId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "eventSr",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    SORId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_eventSr", x => new { x.Id, x.SORId });
                    table.ForeignKey(
                        name: "FK_eventSr_events_Id",
                        column: x => x.Id,
                        principalTable: "events",
                        principalColumn: "EventId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_eventSr_serviceAndResources_SORId",
                        column: x => x.SORId,
                        principalTable: "serviceAndResources",
                        principalColumn: "SoRId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "reviewAndRatings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EventId = table.Column<int>(type: "int", nullable: false),
                    SORId = table.Column<int>(type: "int", nullable: false),
                    TimeSpan = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reviewAndRatings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_reviewAndRatings_events_EventId",
                        column: x => x.EventId,
                        principalTable: "events",
                        principalColumn: "EventId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_reviewAndRatings_serviceAndResources_SORId",
                        column: x => x.SORId,
                        principalTable: "serviceAndResources",
                        principalColumn: "SoRId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EventSoRApprove",
                columns: table => new
                {
                    EventId = table.Column<int>(type: "int", nullable: false),
                    SoRId = table.Column<int>(type: "int", nullable: false),
                    TimeStamp = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsApproved = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ReviewAndRatingId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventSoRApprove", x => new { x.EventId, x.SoRId });
                    table.ForeignKey(
                        name: "FK_EventSoRApprove_events_EventId",
                        column: x => x.EventId,
                        principalTable: "events",
                        principalColumn: "EventId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventSoRApprove_reviewAndRatings_ReviewAndRatingId",
                        column: x => x.ReviewAndRatingId,
                        principalTable: "reviewAndRatings",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EventSoRApprove_serviceAndResources_SoRId",
                        column: x => x.SoRId,
                        principalTable: "serviceAndResources",
                        principalColumn: "SoRId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "rating",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Ratings = table.Column<float>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rating", x => new { x.Id, x.Ratings });
                    table.ForeignKey(
                        name: "FK_rating_reviewAndRatings_Id",
                        column: x => x.Id,
                        principalTable: "reviewAndRatings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "reviewContent",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ReviewAndRatingId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reviewContent", x => new { x.Id, x.Content });
                    table.ForeignKey(
                        name: "FK_reviewContent_reviewAndRatings_Id",
                        column: x => x.Id,
                        principalTable: "reviewAndRatings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_reviewContent_reviewAndRatings_ReviewAndRatingId",
                        column: x => x.ReviewAndRatingId,
                        principalTable: "reviewAndRatings",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_events_ClientId",
                table: "events",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_EventSoRApprove_ReviewAndRatingId",
                table: "EventSoRApprove",
                column: "ReviewAndRatingId");

            migrationBuilder.CreateIndex(
                name: "IX_EventSoRApprove_SoRId",
                table: "EventSoRApprove",
                column: "SoRId");

            migrationBuilder.CreateIndex(
                name: "IX_eventSr_SORId",
                table: "eventSr",
                column: "SORId");

            migrationBuilder.CreateIndex(
                name: "IX_prices_ModelId",
                table: "prices",
                column: "ModelId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_reviewAndRatings_EventId",
                table: "reviewAndRatings",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_reviewAndRatings_SORId",
                table: "reviewAndRatings",
                column: "SORId");

            migrationBuilder.CreateIndex(
                name: "IX_reviewContent_ReviewAndRatingId",
                table: "reviewContent",
                column: "ReviewAndRatingId");

            migrationBuilder.CreateIndex(
                name: "IX_serviceAndResources_serviceCategoryCategoryId",
                table: "serviceAndResources",
                column: "serviceCategoryCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_vendorSRPrices_PriceId",
                table: "vendorSRPrices",
                column: "PriceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EventSoRApprove");

            migrationBuilder.DropTable(
                name: "eventSr");

            migrationBuilder.DropTable(
                name: "featureAndFacility");

            migrationBuilder.DropTable(
                name: "rating");

            migrationBuilder.DropTable(
                name: "reviewContent");

            migrationBuilder.DropTable(
                name: "vendorSRLocation");

            migrationBuilder.DropTable(
                name: "vendorSRPhoto");

            migrationBuilder.DropTable(
                name: "vendorSRPrices");

            migrationBuilder.DropTable(
                name: "vendorSRVideo");

            migrationBuilder.DropTable(
                name: "reviewAndRatings");

            migrationBuilder.DropTable(
                name: "prices");

            migrationBuilder.DropTable(
                name: "events");

            migrationBuilder.DropTable(
                name: "serviceAndResources");

            migrationBuilder.DropTable(
                name: "priceModels");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "serviceCategories");
        }
    }
}
