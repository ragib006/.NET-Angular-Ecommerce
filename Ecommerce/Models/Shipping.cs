namespace Ecommerce.Models
{
    public class Shipping
    {


      
            public int Id { get; set; }
           
            public string ShippingName { get; set; }
            public string ShippingEmail { get; set; }
            public string ShippingPhone { get; set; }
            public string ShippingAddress { get; set; }
            public string ShippingDistrict { get; set; }
            public int UserId { get; set; }
            public string UserName { get; set; }
            public string UserEmail { get; set; }

        // public User User { get; set; }


    }
}
