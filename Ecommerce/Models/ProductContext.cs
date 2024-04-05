using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    public class ProductContext : DbContext
    {

        public ProductContext(DbContextOptions<ProductContext> options) : base(options) 
        {
            
        }

        public DbSet<Product> Products { get; set;}

        public DbSet<User> Users { get; set; }

    }
}
