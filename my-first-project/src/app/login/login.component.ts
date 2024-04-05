import { Component,OnInit } from '@angular/core';
import { RouterLink,ActivatedRoute,Router } from '@angular/router';
import {NgFor,NgIf} from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {ProductsService} from '../services/products.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

	type:string = "password";
	isText: boolean = false;
	eyeIcon: string = "fa-eye-slash"
    loginForm!: FormGroup;



    constructor(
    	private fb:FormBuilder,
        private productService: ProductsService,
        private router: Router
    	){}
 
    
    ngOnInit(): void {

       this.loginForm = this.fb.group({

         email:[''],
         password:['']

  
       })

    }

   hideShowPass() {
    
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";

  }


	onSubmit(){


		console.log(this.loginForm.value);

		this.productService.logIn(this.loginForm.value)
		.subscribe({
          next:(res)=>{
             this.loginForm.reset();
             this.productService.storeToken(res.token);


            alert(res.message);
            this.router.navigate(['/order']);
            console.log(res.message);

          },error:(err)=>{

            alert(err.error.message);



          }

		})

	}

}
