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

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [CommonModule,NgFor,RouterLink,FormsModule],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css'
})
export class ShippingComponent implements OnInit{

//  shippingInfoForm: FormGroup;

 shippingInfo = {
    shippingName: '',
    shippingEmail:'',
    shippingAddress: '',
    shippingDistrict:'',
    shippingPhone:'',
    userId: 0,
    userName:'',
    userEmail:''
  };


  constructor(
  	private productService: ProductsService,
   	private route: ActivatedRoute,
  	private router: Router,
  	
  	//private formBuilder: FormBuilder,

  	) { }







   ngOnInit(): void {
    this.displayUniqueName();

    console.log('aaaa',this.shippingInfo);
  }



  displayUniqueName() {
    const decodedToken = this.productService.decodeToken(); 
    if (decodedToken) {
 

    	this.shippingInfo.userId = Number(decodedToken.nameid);
    	this.shippingInfo.userName  = decodedToken.unique_name;
    	this.shippingInfo.userEmail  = decodedToken.email;

    }
  }



//submitShippingInfo() {
   // this.productService.addShippingInfo(this.shippingInfo)
     // .subscribe(localStorage.setItem('token',tokenValue)
     //  response => {

       	//  localStorage.setItem('shippingInfo', JSON.stringify(this.shippingInfo));

        //  this.router.navigate(['/order']);



   //       console.log('Shipping information added successfully:', response);
  //        this.resetForm();
  //      },
  //      error => {
  //        console.error('Failed to add shipping information:', error);
  //      }
     
// }



submitShippingInfo() {
  this.productService.addShippingInfo(this.shippingInfo)
    .subscribe(
      response => {
        // Store shippingInfo in local storage
       // localStorage.setItem('shippingInfo', JSON.stringify(this.shippingInfo));

      	 localStorage.setItem('shippingInfo', JSON.stringify(response));

        // Navigate to order page
        this.router.navigate(['/order']);

        // Show success message
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
          title: "Shipping Address Added successfully"
        });

        console.log('Shipping information added successfully:', response);
        this.resetForm();
      },
      error => {
        console.error('Failed to add shipping information:', error);
      }
    );
}


  resetForm() {
    this.shippingInfo = {
    shippingName: '',
    shippingEmail:'',
    shippingAddress: '',
    shippingDistrict:'',
    shippingPhone:'',
    userId: this.shippingInfo.userId,
    userName:this.shippingInfo.userName,
    userEmail:this.shippingInfo.userEmail
    };
  }


}
