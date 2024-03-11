using eventify_backend.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eventify_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public ServiceController(AppDbContext appDbContext)
        {
            this._appDbContext = appDbContext;

        }



        [HttpGet("/Api/[Controller]/Categories")]
        public async Task<IActionResult> GetAllServiceCategories()
        {
            var categories = await _appDbContext.serviceCategories
                .Select(x => new { x.CategoryId, x.ServiceCategoryName })
                .ToListAsync();

            if (categories == null || categories.Count == 0)
            {
                return NotFound(false);
            }
            return Ok(categories);
        }

        [HttpGet("/Api/[Controller]/{categoryId}")]

        public async Task<IActionResult> GetServiceByCategory([FromRoute] int categoryId)
        {

       /*     var servicesWithCategories = await _appDbContext.serviceAndResources
                .Select(s => new
                {
                    SoRId = s.SoRId,
                    ServiceName = s.Name,
                    ServiceRating = s.overallRate,
                    IsSuspend = s.IsSuspend,
                })
                .Where(s => s.SoRId == )
                .ToListAsync();   */

            var serviceInfoList = new List<object>
        {
        new
        {
            Service = "Service 1", // Dummy service name
            Rating = 4.5, // Dummy rating
            Availability = "true",
            isSuspend = "true"
// Dummy availability status
        },
        new
        {
            Service = "Service 2", // Dummy service name
            Rating = 3.8, // Dummy rating
            Availability = "false", // Dummy availability status
            isSuspend = "true"
        },
        // Add more dummy data as needed
    };

            // Return the list of service information to the user
            return Ok(serviceInfoList);
        }
    }
}
