using Ecommerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        ProductContext _dbContext;

        public OrderController(ProductContext dbContext)
        {
            _dbContext = dbContext;

        }

        [Route("createorder")]
        [HttpPost]
        public async Task<IActionResult> PlaceOrder(Order order)
        {
          //  if (order == null || order.OrderItems == null || order.OrderItems.Count == 0)
          //  {
          //      return BadRequest("Invalid order data.");
          //  }

            // Save order to database
            _dbContext.Orders.Add(order);
            await _dbContext.SaveChangesAsync();

            return Ok(order.Id);
        }




        [Route("allorder")]
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            try
            {
                var orders = await _dbContext.Orders.Include(o => o.OrderItems).ToListAsync();
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }





        // [HttpPut("{id}/updatesuccess")]



        [HttpPut("updatesuccess/{id}")]
        public async Task<IActionResult> UpdateOrderSuccess(int id)
        {
            var order = await _dbContext.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            // Update PaymentStatus and OrderStatus to "Success"
            order.PaymentStatus = "Success";
            order.OrderStatus = "Success";

            _dbContext.Orders.Update(order);
            await _dbContext.SaveChangesAsync();

            return Ok(order);
        }





        [HttpDelete("deleteorder/{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var product = await _dbContext.Orders.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _dbContext.Orders.Remove(product);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }



        [HttpGet("vieworder/{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            // var order = await _dbContext.Orders.FindAsync(id);


            var order = await _dbContext.Orders
            .Include(o => o.OrderItems) // Include related OrderItems
            .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound(); // Return 404 Not Found if order with the given ID is not found
            }

            return Ok(order); // Return 200 OK with the order details
        }




    }
}
