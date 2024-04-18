

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
  selector: 'app-vieworder',
  standalone: true,
    imports: [CommonModule,NgFor,RouterLink,FormsModule],
  templateUrl: './vieworder.component.html',
  styleUrl: './vieworder.component.css'
})
export class VieworderComponent implements OnInit{



   order: any;
   //quantity: number = 1; 

  serialNumber: number = 1;
  constructor(
  	private productService: ProductsService,
   	private route: ActivatedRoute,
  	private router: Router

  	) { }


   ngOnInit(): void {
   this.loadorderDetails();

  }

  loadorderDetails(): void {


  	const orderId = this.route.snapshot.params['id'];

 console.log('id is',orderId);


   this.productService.viewmyorder(orderId)
      .subscribe((response) => {
      	console.log('Product info:', response);
      	this.order = response;
       // this.newProduct = response;
      }, (error) => {
        console.error('Error loading product:', error);
      });


}






updateOrder(orderId: number): void {
    this.productService.updateOrderStatus(orderId).subscribe(
      (data) => {


          console.log('Order status updated successfully:', data);
       

           this.router.navigate(['/allorder']);

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
          title: "Order Delived successfully"
        });
        //console.log('Order status and payment status updated successfully:', data);
        // Optionally update local order properties after successful update
        // Example: this.order.paymentStatus = 'Success'; this.order.orderStatus = 'Success';
      },
      (error) => {
        console.error('Error updating order status and payment status:', error);
        // Handle error appropriately (e.g., display error message)
      }
    );
  }


 // updateOrder(orderId: number): void {
   
  //  this.productService.updateOrderStatus(orderId, { status: 'Taken' })
    //  .subscribe(
    //    (response) => {
    //      console.log('Order status updated successfully:', response);
       

    //        this.router.navigate(['/allorder']);

     //   const Toast = Swal.mixin({
     //     toast: true,
     //     position: "top-end",
     //     showConfirmButton: false,
      //    timer: 3000,
      //    timerProgressBar: true,
     //     didOpen: (toast) => {
     //       toast.onmouseenter = Swal.stopTimer;
      //      toast.onmouseleave = Swal.resumeTimer;
      //    }
     //   });
     //   Toast.fire({
     //     icon: "success",
    //      title: "Order Delived successfully"
    //    });



  //      },
   //     (error) => {
  //        console.error('Error updating order status:', error);
      
 //       }
//      );
 // }





}
