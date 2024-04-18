import { Component,OnInit } from '@angular/core';
import { RouterLink,ActivatedRoute,Router } from '@angular/router';
import {ProductsService} from '../services/products.service';
import {Product} from '../types/product';
import {
  /* . . . */
  NgFor,
  /* . . . */
} from '@angular/common';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgFor],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{



 public users:any = [];

  constructor(
  	private productService: ProductsService,
   	private route: ActivatedRoute,
  	private router: Router

  	) { }


  ngOnInit(){

    this.productService.getUsers()
    .subscribe(res=>{

         this.users = res

    })

  }


}
