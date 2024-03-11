using eventify_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace eventify_backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<ServiceAndResource> serviceAndResources { get; set; }
        public DbSet<FeatureAndFacility> featureAndFacility { get; set; }

        public DbSet<Service> services { get; set; }

        public DbSet<ServiceCategory> serviceCategories { get; set; }

        public DbSet<VendorSRPhoto> vendorSRPhoto { get; set; }

        public DbSet<VendorSRVideo> vendorSRVideo { get; set; }

        public DbSet<Price> prices { get; set; }
        public DbSet<PriceModel> priceModels { get; set; }

        public DbSet<VendorSRPrice> vendorSRPrices { get; set; }

        public DbSet<VendorSRLocation> vendorSRLocation { get; set; }

        public DbSet<User> users { get; set; }
        public DbSet<Client> clients { get; set; }

        public DbSet<Vendor> vendors { get; set; }

        public DbSet<Event> events { get; set; }

        public DbSet<EventSR> eventSr { get; set; }

        public DbSet<ReviewAndRating> reviewAndRatings { get; set; }

        public DbSet<ReviewContent> reviewContent { get; set; }

        public DbSet<Rating> rating { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FeatureAndFacility>()
                .HasKey(ff => new { ff.SORId, ff.FacilityName });

            modelBuilder.Entity<FeatureAndFacility>()
                .HasOne(ff => ff.ServiceAndResource)
                .WithMany(sor => sor.FeaturesAndFacilities)
                .HasForeignKey(ff => ff.SORId);

            modelBuilder.Entity<VendorSRPhoto>()
                .HasKey(vp => new { vp.Id, vp.photoId });

            modelBuilder.Entity<ServiceAndResource>()
                .HasMany(s => s.VendorRSPhotos)
                .WithOne(vr => vr.ServiceAndResource)
                .HasForeignKey(vr => vr.Id);

            modelBuilder.Entity<VendorSRVideo>()
                .HasKey(vv => new { vv.Id, vv.VideoId });

            modelBuilder.Entity<ServiceAndResource>()
                .HasMany(s => s.VendorRSVideos)
                .WithOne(vr => vr.ServiceAndResource)
                .HasForeignKey(vr => vr.Id);

            modelBuilder.Entity<VendorSRPrice>()
                .HasKey(vp => new { vp.ServiceAndResourceId, vp.PriceId });

            modelBuilder.Entity<VendorSRLocation>()
    .            HasKey(v => new { v.Id, v.LocationId });

            modelBuilder.Entity<VendorSRLocation>()
                .HasOne(v => v.ServiceAndResource)
                .WithMany(sr => sr.VendorSRLocations) // Specify the navigation property in ServiceAndResource entity
                .HasForeignKey(v => v.Id);

            modelBuilder.Entity<EventSR>()
                .HasKey(e => new { e.Id, e.SORId });

            modelBuilder.Entity<EventSR>()
                .HasOne(e => e.Event)
                .WithMany(e => e.EventSRs)
                .HasForeignKey(e => e.Id);

            modelBuilder.Entity<EventSR>()
                .HasOne(e => e.ServiceAndResource)
                .WithMany(e => e.EventSRs)
                .HasForeignKey(e => e.SORId);

            modelBuilder.Entity<ReviewContent>()
                .HasKey(r => new { r.Id, r.Content });

            modelBuilder.Entity<ReviewAndRating>()
                .HasMany(r => r.ReviewAndRatingContents)
                .WithOne(rc => rc.ReviewAndRating)
                .HasForeignKey(rc => rc.Id);

            modelBuilder.Entity<Rating>()
                .HasKey(r => new { r.Id, r.Ratings });

            modelBuilder.Entity<EventSoRApprove>()
              .HasKey(e => new { e.EventId, e.SoRId });
        }
    }

 
}
