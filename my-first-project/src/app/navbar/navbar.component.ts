import { Component,OnInit } from '@angular/core';
import { RouterLink,ActivatedRoute,Router } from '@angular/router';
import {ProductsService} from '../services/products.service';
import Swal from 'sweetalert2';

import {
  /* . . . */
  NgFor,NgIf
  /* . . . */
} from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{


  uniqueName: string | undefined;

	 constructor(
  	private productService: ProductsService,
   	private route: ActivatedRoute,
  	private router: Router

  	) { }



  //ngOnInit() {


 // }

    ngOnInit(): void {
    this.displayUniqueName();


    console.log(this.displayUniqueName());
  }



  displayUniqueName() {
    const decodedToken = this.productService.decodeToken(); // Assuming authService has the decodeToken function
    if (decodedToken) {
      this.uniqueName = decodedToken.unique_name;
    }
  }



	 logout(){


	 this.productService.signOut();

	 this.uniqueName = undefined;

      this.router.navigate(['/login']);

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
  title: "Logout Successfully"
});




	 }

}
