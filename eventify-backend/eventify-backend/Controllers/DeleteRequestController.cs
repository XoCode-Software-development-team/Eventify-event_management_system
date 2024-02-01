using eventify_backend.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eventify_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeleteRequestController : Controller
    {
        private readonly ServiceDbContext _serviceDbContext;

        public DeleteRequestController(ServiceDbContext serviceDbContext)
        {
            this._serviceDbContext = serviceDbContext;
        }

        [HttpGet("/Api/[Controller]")]

        public async Task<IActionResult> DeleteRequestCategories()
        {
            var categories = await _serviceDbContext.services.Where(s => s.IsDelete == true)
                .Select(s => s.Category).Distinct().ToListAsync();

            if (categories == null)
            {
                return NotFound(false);
            }
            return Ok(categories);
        }

        [HttpGet("/Api/[Controller]/{category}")]

        public async Task<IActionResult> DeleteRequestServices([FromRoute] string category)
        {
            var services = await _serviceDbContext.services.Where(s => (s.Category == category && s.IsDelete == true)).ToListAsync();

            if (services == null || services.Count == 0)
            {
                return NotFound(false);
            }
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

            var deletedCategory = service.Category;

            _serviceDbContext.services.Remove(service);
            await _serviceDbContext.SaveChangesAsync();

            var remainingCount = await _serviceDbContext.services.CountAsync(s => s.Category == deletedCategory && s.IsDelete == true);

            return Ok(new { DeletedService = service, RemainingCount = remainingCount });
        }

        [HttpPut("/Api/[Controller]/{Id}")]
        public async Task<IActionResult> ChangeDeleteRequestState([FromRoute] Guid Id)
        {
            var service = await _serviceDbContext.services.FindAsync(Id);
            if (service == null)
            {
                return NotFound();
            }

            service.IsDelete = false;

            await _serviceDbContext.SaveChangesAsync();

            var remainingCount = await _serviceDbContext.services.CountAsync(s => s.Category == service.Category && s.IsDelete == true);

            return Ok(new { DeletedService = service, RemainingCount = remainingCount });

        }

    }
}
