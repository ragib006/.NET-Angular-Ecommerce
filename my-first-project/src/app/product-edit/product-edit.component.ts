import { Component,OnInit } from '@angular/core';

import { RouterLink,ActivatedRoute,Router } from '@angular/router';
import {ProductsService} from '../services/products.service';
import {Product} from '../types/product';

import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import {
  /* . . . */
  NgFor,
  /* . . . */
} from '@angular/common';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [NgFor,RouterLink,FormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit{

 newProduct: Product = {

    id:0,
    name: '',
    category: '',
    price: 0,
    image:'',
    description:''
  };

  constructor(
  	private productService: ProductsService,
  	private route: ActivatedRoute,
  	private router: Router

  	) { }


  ngOnInit() {
    // Load existing product details for updating
    this.loadProduct();
  }

  loadProduct() {
    //const productId = 1; // Replace with actual product ID or fetch from route params

const productId = this.route.snapshot.params['id'];

    this.productService.getmyoneProduct(productId)
      .subscribe((response) => {
      	console.log('Product info:', response);
        this.newProduct = response;
      }, (error) => {
        console.error('Error loading product:', error);
      });
  }


    updateProduct() {
    this.productService.updatemyProduct(this.newProduct)
      .subscribe((response) => {
        //console.log('Product updated successfully:', response);

       // this.router.navigate(['/addproduct']);
        // You can perform further actions here after updating the product


  //Swal.fire({
      //    icon: 'success',
      //    title: 'Success',
      //    text: 'Product updated successfully'
      //  })

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
  title: "Product Update successfully"
})


  .then(() => {
          // Navigate to another route after product update
          this.router.navigate(['/addproduct']);
        });





      }, (error) => {
        console.error('Error updating product:', error);
        // Handle error appropri
      });
  }





}
