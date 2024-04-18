﻿using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    public class ProductContext : DbContext
    {

        public ProductContext(DbContextOptions<ProductContext> options) : base(options) 
        {
            
        }

        public DbSet<Product> Products { get; set;}

        public DbSet<User> Users { get; set; }

        public DbSet<Shipping> Shippings { get; set; }


        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

    }
}
