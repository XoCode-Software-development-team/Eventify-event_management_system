using eventify_backend.Data;
using eventify_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eventify_backend.Controllers
{
    [ApiController]
    [Route("/Api/[Controller]")]
    public class ServiceController : Controller

    {
        private readonly ServiceDbContext _serviceDbContext;

        public ServiceController(ServiceDbContext serviceDbContext)
        {
            this._serviceDbContext = serviceDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _serviceDbContext.services.Select(x => x.Category).Distinct().ToListAsync();

            if (categories == null)
            {
                return NotFound();
            }
            return Ok(categories);
        }

        [HttpGet("/Api/[Controller]/{category}")]

        public async Task<IActionResult> GetServiceByCategory([FromRoute]string category)
        {
            var services = await _serviceDbContext.services.Where(s => s.Category == category).ToListAsync();

            if (services == null || services.Count == 0)
            {
                return NotFound(false);
            }
            return Ok(services);
        }


        [HttpPost]
        public async Task<IActionResult> AddServicee([FromBody] Services services)
        {
            services.Id = Guid.NewGuid();
            await _serviceDbContext.services.AddAsync(services);
            await _serviceDbContext.SaveChangesAsync();

            return Ok(services);
        }

        [HttpDelete("/Api/[Controller]/{Id}")]
        public async Task<IActionResult> DeleteService([FromRoute] Guid Id)
        {
            var service = await _serviceDbContext.services.FindAsync(Id);

            if (service == null)
            {
                return NotFound(Id);
            }

            var deletedCategory = service.Category; // Save the category before deletion

            _serviceDbContext.services.Remove(service);
            await _serviceDbContext.SaveChangesAsync();

            // Count the remaining instances of the deleted category
            var remainingCount = await _serviceDbContext.services.CountAsync(s => s.Category == deletedCategory);

            // Return the count as part of the response
            return Ok(new { DeletedService = service, RemainingCount = remainingCount });
        }





    }
}
