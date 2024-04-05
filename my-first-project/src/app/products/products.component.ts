import { Component,inject,OnInit } from '@angular/core';

import {ProductsService} from '../services/products.service';

import { Observable } from 'rxjs';

import {Product} from '../types/product';

import {AsyncPipe} from '@angular/common';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{


   products$!:Observable<Product[]>

// products!:Observable<Product[]>

productService = inject(ProductsService);


ngOnInit(): void {

	this.products$=this.productService.getProducts()

//	 this.productService.getProducts()
//    .subscribe({
//      next:(response)=>{
//       console.log(response);
//      },
//      error:(error)=>{
 //      console.log(error);
//      }

//	 })
}


}
