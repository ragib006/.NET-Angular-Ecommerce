using Ecommerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShippingController : ControllerBase
    {

        ProductContext _dbContext;

        public ShippingController(ProductContext dbContext)
        {
            _dbContext = dbContext;

        }

        [Route("createshipping")]
        [HttpPost]
        public async Task<ActionResult<Shipping>> PostShipping(Shipping shipping)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _dbContext.Shippings.Add(shipping);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetShipping), new { id = shipping.Id }, shipping);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Shipping>> GetShipping(int id)
        {
            var shipping = await _dbContext.Shippings.FindAsync(id);

            if (shipping == null)
            {
                return NotFound();
            }

            return Ok(shipping);
        }






        //  public async Task<ActionResult<Shipping>> PostShipping(Shipping shipping)
        //  {
        //     _dbContext.Shippings.Add(shipping);
        //     await _dbContext.SaveChangesAsync();

        //      return Ok(new
        //     {

        //         Message = "Shipping information create successfully Successfull"

        //      });
        //   }




        //  [Route("getshipping")]
        //   [HttpGet]
        //  public async Task<ActionResult<IEnumerable<Shipping>>> GetShippings()
        //  {
        //      var shippings = await _dbContext.Shippings.Include(s => s.User).ToListAsync();
        //     return Ok(shippings);
        //  }

    }
}
