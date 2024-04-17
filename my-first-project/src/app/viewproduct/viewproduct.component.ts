import { Component,OnInit } from '@angular/core';
import { RouterLink,ActivatedRoute,Router } from '@angular/router';
import {ProductsService} from '../services/products.service';
import {Product} from '../types/product';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import {
  /* . . . */
  NgFor,
  /* . . . */
} from '@angular/common';


@Component({
  selector: 'app-viewproduct',
  standalone: true,
  imports: [CommonModule,NgFor,RouterLink,FormsModule],
  templateUrl: './viewproduct.component.html',
  styleUrl: './viewproduct.component.css'
})
export class ViewproductComponent implements OnInit{

 // product: Product | undefined;


   product: any;
   quantity: number = 1; 
   serialNumber: number = 1;

  constructor(
  	private productService: ProductsService,
   	private route: ActivatedRoute,
  	private router: Router

  	) { }


   ngOnInit(): void {
   this.loadProductDetails();

  }

  loadProductDetails(): void {


  	const productId = this.route.snapshot.params['id'];

 console.log('id is',productId);


   this.productService.viewmyProduct(productId)
      .subscribe((response) => {
      	console.log('Product info:', response);
      	this.product = response;
       // this.newProduct = response;
      }, (error) => {
        console.error('Error loading product:', error);
      });


}



  addToCart(product: any): void {
   // this.cartService.addToCart(product).subscribe(


 //addToCart(): void {
    const cartItem = {
        productId: this.product.id,
      productName: this.product.name,
      productImage: this.product.image,
      price: this.product.price,
      quantity: this.quantity
    };

   // .subscribe(() => {
      // Handle success message or any other action after adding to cart
   // }, error => {
      // Handle error
   // });


this.productService.addToCart(cartItem).subscribe((response) => {


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
  title: "Add To Cart Successfully"
});



      	//console.log('cart message:', response);
      	//this.product = response;
       // this.newProduct = response;
      }, (error) => {
        console.error('Error loading product:', error);
      });




  }













}