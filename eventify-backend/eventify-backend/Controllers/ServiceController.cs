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
            var categories = await _serviceDbContext.services.Select(x => x.Categories).Distinct().ToListAsync();

            categories = ["Entertainment", "Catering", "Decoration"];


            if (categories == null)
            {
                return NotFound();
            }
            return Ok(categories);
        }


       
}
}
