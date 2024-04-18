import { Component,inject,OnInit } from '@angular/core';
import {ReactiveFormsModule,FormBuilder,FormGroup} from '@angular/forms'

import {JsonPipe} from "@angular/common";

import {AsyncPipe} from '@angular/common';

import { RouterLink,ActivatedRoute,Router } from '@angular/router';


import {ProductsService} from '../services/products.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe,RouterLink],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{


form!:FormGroup;
productService = inject(ProductsService);

//id: number;


constructor(private fb:FormBuilder, private activatedRouter:ActivatedRoute,private router:Router){


}


onSubmit(){


	//console.log(this.id);

this.productService.addProduct(this.form.value)

   .subscribe({
      next:(response)=>{
       console.log(response);

       this.router.navigateByUrl('/products')
      },
      error:(error)=>{
        console.log(error);
      }

	 })

//console.log(this.form.value);


}




ngOnInit(): void{

this.activatedRouter.params.subscribe({

	//this.id = params['id'];

  next:(response)=>{
       console.log(response['id']);

this.productService.getSingleProduct(response['id']).subscribe({

    next:(response)=>{
     
    // console.log(response)

    	this.form.patchValue(response)

    }, 
    error:(error)=>{
        console.log(error);
      }

})


      },
      error:(error)=>{
        console.log(error);
      }


})




this.form = this.fb.group({

 name:[],
 category:[],
 image:[],
 price:[],
 description:[]

})

}





}
