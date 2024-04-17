namespace Ecommerce.Models
{
    public class Order
    {

        
        public int Id { get; set; }  
        public int Userid { get; set; }  
        public string Username { get; set; }  
        public string UserEmail { get; set; }  
        public int ShippingId { get; set; }  
        public string ShippingName { get; set; }  
        public string ShippingAddress { get; set; }

        public string ShippingEmail { get; set; }

        public string ShippingPhone { get; set; }

        public string ShippingDistrict { get; set; }



        public string PaymentMethod { get; set; }  
        public string PaymentStatus { get; set; } = "Pending";

        public string TaxId { get; set; }  
        public string OrderStatus { get; set; } = "Pending";
        public int OrderTotal { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.Today;


        public ICollection<OrderItem> OrderItems { get; set; }


    }
}
