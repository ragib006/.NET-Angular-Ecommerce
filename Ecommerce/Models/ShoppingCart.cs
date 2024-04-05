namespace Ecommerce.Models
{
    public class ShoppingCart
    {

        public List<ShoppingCartItem> Items { get; set; } = new List<ShoppingCartItem>();

       // public int TotalPrice => Items.Sum(item => item.Price);

        //   public int TotalPrice { get { 

        //       int totalPrice = 0;
        //       foreach(var item in Items)
        //           {
        //               totalPrice  += item.Price;

        //           }
        //           return totalPrice;

        //       } }


    }
}
