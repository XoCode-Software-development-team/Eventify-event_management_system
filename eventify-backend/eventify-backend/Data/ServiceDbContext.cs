using eventify_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace eventify_backend.Data
{
    public class ServiceDbContext : DbContext
    {
        public ServiceDbContext(DbContextOptions<ServiceDbContext> options) : base(options) { }
        
        public DbSet<Services> services { get; set; }
    }
}
