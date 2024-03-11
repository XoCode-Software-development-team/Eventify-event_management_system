using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eventify_backend.Models
{
    public class Service : ServiceAndResource
    {
        public int Capacity { get; set; }

        [ForeignKey("CategoryId")]
        public int CategoryId { get; set; }

        public ServiceCategory? serviceCategory { get; set; }

    }
}
