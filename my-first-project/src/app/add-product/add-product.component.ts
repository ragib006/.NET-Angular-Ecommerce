import { Component,OnInit } from '@angular/core';
import { RouterLink,ActivatedRoute,Router } from '@angular/router';
import {ProductsService} from '../services/products.service';
import {Product} from '../types/product';

import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

import {
  /* . . . */
  NgFor,
  /* . . . */
} from '@angular/common';





@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [NgFor,RouterLink,FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{

 newProduct: Product = {

    id:0,
    name: '',
    category: '',
    price: 0,
    image:'',
    description:''
  };


 products: Product[] = [];

  constructor(
  	private productService: ProductsService,
   	private route: ActivatedRoute,
  	private router: Router

  	) { }



  ngOnInit() {
    // Load existing product details for updating
   //  this.loadProduct();
    // Load product list
    this.loadProductList();


console.log("my product reload");

  }



  loadProductList() {
    this.productService.getProducts()
      .subscribe((response) => {
        this.products = response;
      }, (error) => {
        console.error('Error loading product list:', error);
      });
  }

 //loadProduct() {
    //const productId = 1; // Replace with actual product ID or fetch from route params

//const productId = this.route.snapshot.params['id'];

  //  this.productService.getmyoneProduct(productId)
  //    .subscribe((response) => {
   //   	console.log('Product info:', response);
   //     this.newProduct = response;
   //   }, (error) => {
   //     console.error('Error loading product:', error);
    //  });
 // }



 addProduct() {
    this.productService.addmyProduct(this.newProduct)
      .subscribe((response) => {
        console.log('Product added successfully:', response);


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
  title: "Product Added successfully"
}).then(() => {
         //  Navigate to another route after product update
          this.router.navigate(['/addproduct']);
        });

        this.loadProductList();


        // Reset newProduct object




        // You can perform further actions here after adding the product
      }, (error) => {
        console.error('Error adding product:', error);
        // Handle error appropriately
      });
  }


  deleteProduct(productId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deletemyProduct(productId)
          .subscribe(() => {
            Swal.fire(
              'Deleted!',
              'Your product has been deleted.',
              'success'
            );
            // Optionally, navigate to another page or perform any other action after deletion
              this.loadProductList();

          }, (error) => {
            console.error('Error deleting product:', error);
            Swal.fire(
              'Error!',
              'Failed to delete product.',
              'error'
            );
          });
      }
    });
  }



}
