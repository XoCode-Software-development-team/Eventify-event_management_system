using System.ComponentModel.DataAnnotations;

namespace eventify_backend.Models
{
    public class Services
    {
        public Guid Id { get; set; }
        public string Service { get; set; } = string.Empty;

        public string Categories {  get; set; } = string.Empty;
        public int Rating { get; set; }
        public bool Availability { get; set; }
    }
}
