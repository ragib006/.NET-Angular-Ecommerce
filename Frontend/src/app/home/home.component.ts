import { Component,OnInit } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import {ProductsService} from '../services/products.service';

import {Product} from '../types/product';

import {
  /* . . . */
  NgFor,
  /* . . . */
} from '@angular/common';


import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

	 products: Product[] = [];

  constructor(
  	private productService: ProductsService
   //private route: ActivatedRoute,
  	//private router: Router

  	) { }


  ngOnInit() {
  
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


}
