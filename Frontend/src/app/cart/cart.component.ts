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
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,NgFor,RouterLink,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

public cartproduct:any = [];
  serialNumber: number = 1;

//deleteResultMessage: string = '';
  constructor(
  	private productService: ProductsService,
   	private route: ActivatedRoute,
  	private router: Router

  	) { }



  ngOnInit() {
    // Load existing product details for updating
   //  this.loadProduct();
    // Load product list
    this.loadcartProductList();

     
//console.log("my product reload");

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





  deleteProduct(productId: number) {
    this.productService.deleteCartProduct(productId).subscribe(
      (response) => { // Cast response to string
        console.log('Delete response:', response);

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
  title: "Product Delete successfully"
});
      
        this.loadcartProductList(); // Reload product list after deletion
      },
      (error) => {
        console.error('Error deleting product:', error);
      
      }
    );
  }







}
