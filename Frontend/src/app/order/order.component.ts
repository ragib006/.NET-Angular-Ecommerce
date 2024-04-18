import { Component,OnInit } from '@angular/core';
import { RouterLink,ActivatedRoute,Router } from '@angular/router';
import {ProductsService} from '../services/products.service';
import {CartItem} from '../types/cartitem';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import {
  /* . . . */
  NgFor,
  /* . . . */
} from '@angular/common';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule,NgFor,RouterLink,FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{


shippingInfo: any; 

public cartproduct:any = [];

  serialNumber: number = 1;

  constructor(
  	private productService: ProductsService,
   	private route: ActivatedRoute,
  	private router: Router,

  	) { }


  ngOnInit(): void {
 
  this.displayUnerinfo();

  this.loadcartProductList();

}



  loadcartProductList() {
    this.productService.getCartProduct()
      .subscribe((response) => {

      console.log(response);

        this.cartproduct = response;
      }, (error) => {
        console.error('Error loading product list:', error);
      });
  }



  displayUnerinfo() {
    const storedShippingInfo = localStorage.getItem('shippingInfo');
  if (storedShippingInfo) {
    this.shippingInfo = JSON.parse(storedShippingInfo);
  }

  console.log('myaaaa', this.shippingInfo);
  }



 placeOrder(paymentMethod: string, trxId: string) {


    const order = {
      userId: this.shippingInfo.userId,
      username: this.shippingInfo.userName,
      userEmail: this.shippingInfo.userEmail,
      shippingId: this.shippingInfo.id,
      shippingName: this.shippingInfo.shippingName,
      shippingAddress: this.shippingInfo.shippingAddress,

      shippingEmail: this.shippingInfo.shippingEmail,
      shippingPhone: this.shippingInfo.shippingPhone,
      shippingDistrict: this.shippingInfo.shippingDistrict,

      paymentMethod: paymentMethod,
      taxId: trxId, // Add tax ID if applicable
      orderTotal: this.cartproduct.totalPrice,
       orderItems: this.cartproduct.items.map((item: CartItem) => ({  // Specify CartItem type
        productId: item.productId,
        productName: item.productName,
        productImage: item.productImage,
        quantity: item.quantity,
        price: item.price
      }))
    };

    this.productService.myplaceOrder(order).subscribe(
      response => {
        console.log('Order placed successfully', response);

         this.router.navigate(['/']);

     const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Order Place successfully"
        });



        // Call destroyCart API after placing order
          this.destroyCart();


        // Optionally, navigate to a thank you page or perform other actions
      },
      error => {
        console.error('Error placing order:', error);
        // Handle error and display to user
      }
    );
  }



 destroyCart() {
    this.productService.mydestroyCart().subscribe(
      response => {
        console.log('Cart destroyed successfully', response);
        // Optionally, update cart UI or perform other actions
      },
      error => {
        console.error('Error destroying cart:', error);
        // Handle error and display to user
      }
    );
  }











}
