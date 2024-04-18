import { Component,OnInit } from '@angular/core';
import { RouterLink,ActivatedRoute,Router } from '@angular/router';
import {ProductsService} from '../services/products.service';
import Swal from 'sweetalert2';

import {UserStoreService} from '../services/user-store.service';

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

  public fullName : string = "";

  public role : string = "";

	 constructor(
  	private productService: ProductsService,
   	private route: ActivatedRoute,
  	private router: Router,
  	private userStore:UserStoreService,

  	) { }



  //ngOnInit() {


 // }

    ngOnInit(): void {
   // this.displayUniqueName();


   // console.log(this.displayUniqueName());


     this. displayuserName();

     this.adminRole();

  }



 // displayUniqueName() {
 //   const decodedToken = this.productService.decodeToken(); // Assuming authService has the decodeToken function
 //   if (decodedToken) {
 //     this.uniqueName = decodedToken.unique_name;
 //   }
 // }



  displayuserName() {
   
   this.userStore.getFullNameFromStore().subscribe(val=>{

       const fullNameFromToken = this.productService.getfullNameFromToken();

       this.fullName = val || fullNameFromToken

   })
  }



adminRole(){


   this.userStore.getRoleFromStore().subscribe(val=>{

       const roleFromToken = this.productService.getRoleFromToken();

       this.role = val || roleFromToken

   })


}








	 logout(){


	 this.productService.signOut();

	   this.fullName = ''; // Clear the displayed full name
       this.role = ''; // Clear the displayed role

	// this.uniqueName = undefined;

	// this.fullName = undefined;

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
