using Ecommerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        ProductContext _dbContext;

        public ProductController(ProductContext dbContext)
        {
            _dbContext = dbContext;

        }

        //   [Route("allproduct")]
        //  [HttpGet]

        //  public List<Product> GetProducts()
        // {

        //    var products = _dbContext.Products.ToList();

        //      return products;

        //  }



        //  [Route("addproduct")]
        //   [HttpPost]

        //   public Product addproduct(Product product)
        //   {
        //       _dbContext.Products.Add(product);
        //      bool isSaved = _dbContext.SaveChanges() > 0;
        //       if(isSaved)
        //      {
        //        return product;

        //      }
        //     return null;

        //  }


       // [Route("myproduct")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> allproduct()
        {
            // return await _dbContext.Products.ToListAsync();

            if (_dbContext.Products == null)
            {
                return NotFound();
            }

            return await _dbContext.Products.ToListAsync();


        }


        [HttpPost]
        public async Task<ActionResult<Product>> createproduct(Product product)
        {
            //  _dbContext.Products.Add(product);
            //  await _dbContext.SaveChangesAsync();

            //  return CreatedAtAction(nameof(allproduct), new { id = product.Id }, product);
          // var existingProduct = await _dbContext.Products.FirstOrDefaultAsync(p => p.Name == product.Name && p.Category == product.Category);


            var existingProduct = await _dbContext.Products.FirstOrDefaultAsync(p => p.Name == product.Name);

            if (existingProduct != null)
            {
               

                return Conflict(new { message = "This Product Already Exist" });


            }

        

            _dbContext.Products.Add(product);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(allproduct), new { id = product.Id }, product);

        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Product>> singleproduct(int Id)
        {
            var product = await _dbContext.Products.FindAsync(Id);

            if (product == null)
            {
               // return NotFound();
                return Conflict(new { message = "This Id not found" });
            }
        

            return product;
        }


        [HttpPut("{Id}")]
        public async Task<ActionResult<Product>> Updateproduct(int Id, Product myproduct) {

            var product = await _dbContext.Products.FindAsync(Id);

            if (product == null)
           {
             
               return Conflict(new { message = "This Id not found" });
            }

            product.Name = myproduct.Name;
            product.Category = myproduct.Category;
            product.Price = myproduct.Price;
            product.Image = myproduct.Image;
            product.Description = myproduct.Description;

            await _dbContext.SaveChangesAsync();

            return Ok(product);

        }




        //  [HttpPut("{Id}")]
        // public async Task<IActionResult> updateproduct(int Id, Product product)
        //  {
        //    if (Id != product.Id)
        //   {
        // return BadRequest();
        //   return Conflict(new { message = "This Id not found" });
        //   }

        //  _dbContext.Entry(product).State = EntityState.Modified;

        //   try
        //  {
        //    await _dbContext.SaveChangesAsync();
        //  }
        //  catch (DbUpdateConcurrencyException)
        //  {
        //   if (!ProductExists(Id))
        //    {
        //        return NotFound();
        //    }
        //     {
        //         throw;
        //    }
        //   }

        //   return NoContent();
        //  }



        //  private bool ProductExists(int Id)
        //  {
        //      return _dbContext.Products.Any(e => e.Id == Id);
        //  }





        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteProduct(int Id)
        {
            var product = await _dbContext.Products.FindAsync(Id);
            if (product == null)
            {
                return NotFound();
            }

            _dbContext.Products.Remove(product);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }








        //  [Route("myproduct")]
        //  [HttpGet]

        //  public async Product<IActionResult> GetProduct() {

        //       var product = await _dbContext.Products.ToListAsync();

        //       return Ok(product);

        //  }                          



        // public async Product<ActionResult<IEnumerable<Product>>> getmyproduct()
        //  {

        //   if(_dbContext.Products == null)
        //    {
        //        return NotFound();  
        //     }

        //     return await _dbContext.Products.ToListAsync();

        // }




    }
}
