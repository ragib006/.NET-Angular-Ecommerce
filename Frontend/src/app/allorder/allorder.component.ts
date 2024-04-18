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
  selector: 'app-allorder',
  standalone: true,
   imports: [CommonModule,NgFor,RouterLink,FormsModule],
  templateUrl: './allorder.component.html',
  styleUrl: './allorder.component.css'
})
export class AllorderComponent implements OnInit{




   public allorder:any = [];

  serialNumber: number = 1;

  constructor(
  	private productService: ProductsService,
   	private route: ActivatedRoute,
  	private router: Router,


  	) { }


  ngOnInit(): void {
 
 

  this.loadorderList();

}



  loadorderList() {
    this.productService.getallorder()
      .subscribe((response) => {

      console.log(response);

        this.allorder = response;
      }, (error) => {
        console.error('Error loading product list:', error);
      });
  }




  deleteOrder(id: number) {
    this.productService.deleteorder(id).subscribe(
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
  title: "Order Delete successfully"
});
      
        this.loadorderList(); // Reload product list after deletion
      },
      (error) => {
        console.error('Error deleting product:', error);
      
      }
    );
  }






}
