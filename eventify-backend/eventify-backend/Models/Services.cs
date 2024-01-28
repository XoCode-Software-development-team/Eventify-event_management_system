using System.ComponentModel.DataAnnotations;

namespace eventify_backend.Models
{
    public class Services
    {
        public Guid Id { get; set; }
        public string Service { get; set; } = string.Empty;

        public string Category {  get; set; } = string.Empty;
        public double Rating { get; set; }
        public bool IsAvailable { get; set; }

        public bool IsSuspend { get; set; }
        public bool IsDelete { get; set; }
    }
}
