using Ecommerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.StackExchangeRedis;
using Newtonsoft.Json;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {

        private readonly IDistributedCache _redisCache;


        public CartController(IDistributedCache redisCache)
        {
            _redisCache = redisCache;

        }


        //  [Route("viewmycart")]
        // [HttpGet]
        //   public async Task<IActionResult> ViewmyCart()
        // {
        //     var cartJson = await _redisCache.GetStringAsync("cart");
        //      var cart = string.IsNullOrEmpty(cartJson) ? new ShoppingCart() : JsonConvert.DeserializeObject<ShoppingCart>(cartJson);

        //      return Ok(cart);
        //   }


        //product add to cart

        [Route("addtocart")]
        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] ShoppingCartItem item)
        {
            try
            {
                var cartJson = await _redisCache.GetStringAsync("cart");
                var cart = cartJson != null ? JsonConvert.DeserializeObject<ShoppingCart>(cartJson) : new ShoppingCart { Items = new List<ShoppingCartItem>() };

                cart.Items.Add(item);

                var updatedCartJson = JsonConvert.SerializeObject(cart);
                await _redisCache.SetStringAsync("cart", updatedCartJson);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }





        //view cart

        [Route("viewcart")]
        [HttpGet]
        public async Task<IActionResult> ViewCart()
        {
            try
            {
                var cartJson = await _redisCache.GetStringAsync("cart");
                var cart = cartJson != null ? JsonConvert.DeserializeObject<ShoppingCart>(cartJson) : new ShoppingCart { Items = new List<ShoppingCartItem>() };

                // Calculate total price
                // int totalPrice = cart.Items.Sum(item => item.Price);

                 int totalPrice = cart.Items.Sum(item => item.Price * item.Quantity);

               // decimal totalPrice = cart.Items.Sum(item => item.Price * item.Quantity);


                // Calculate total product count
                int totalProducts = cart.Items.Count;

                // Calculate total product quantity
                int totalProductQuantity = cart.Items.Sum(item => item.Quantity);

                // Create a new object to hold cart items, total price, total product count, and total product quantity
                var cartSummary = new
                {
                    Items = cart.Items,
                    TotalPrice = totalPrice,
                    TotalProducts = totalProducts,
                    TotalProductQuantity = totalProductQuantity
                };

                return Ok(cartSummary);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }


        //update cart

        [Route("updatecart")]
        [HttpPost]
        public async Task<IActionResult> UpdateCart([FromBody] ShoppingCartItem updatedItem)
        {
            try
            {
                // Retrieve cart from Redis
                var cartJson = await _redisCache.GetStringAsync("cart");
                var cart = cartJson != null ? JsonConvert.DeserializeObject<ShoppingCart>(cartJson) : new ShoppingCart { Items = new List<ShoppingCartItem>() };

                // Find the item in the cart by productId
                var existingItem = cart.Items.FirstOrDefault(item => item.productId == updatedItem.productId);

                if (existingItem != null)
                {
                    // Update the quantity of the existing item
                    existingItem.Quantity = updatedItem.Quantity;

                    // Save the updated cart to Redis
                    await _redisCache.SetStringAsync("cart", JsonConvert.SerializeObject(cart));

                    return Ok("Cart updated successfully");
                }
                else
                {
                    return BadRequest("Product not found in the cart");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }



        //deleteproductfromcart

        [Route("deleteproductfromcart/{productId}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteProductFromCart(int productId)
        {
            try
            {
                // Retrieve cart from Redis
                var cartJson = await _redisCache.GetStringAsync("cart");
                var cart = cartJson != null ? JsonConvert.DeserializeObject<ShoppingCart>(cartJson) : new ShoppingCart { Items = new List<ShoppingCartItem>() };

                // Find the index of the item in the cart by productId
                var itemToRemove = cart.Items.FirstOrDefault(item => item.productId == productId);

                if (itemToRemove != null)
                {
                    // Remove the item from the cart
                    cart.Items.Remove(itemToRemove);

                    // Save the updated cart to Redis
                    await _redisCache.SetStringAsync("cart", JsonConvert.SerializeObject(cart));

                    return NoContent();

                   // return Ok("Product removed from the cart successfully");
                }
                else
                {
                    return BadRequest("Product not found in the cart");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }


        //destroy cart

        [Route("deletecart")]
        [HttpDelete]
        public async Task<IActionResult> DeleteCart()
        {
            try
            {
                // Delete the cart from Redis
                await _redisCache.RemoveAsync("cart");

                return Ok("Cart deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }



        //  public async Task<IActionResult> ViewCart()
        //  {
        //    try
        //     {
        //         var cartJson = await _redisCache.GetStringAsync("cart");
        //         var cart = cartJson != null ? JsonConvert.DeserializeObject<ShoppingCart>(cartJson) : new ShoppingCart { Items = new List<ShoppingCartItem>() };
        //         return Ok(cart.Items);
        //      }
        //      catch (Exception ex)
        //     {
        //         return StatusCode(500, $"Internal server error: {ex}");
        //     }
        //  }





    }
}
