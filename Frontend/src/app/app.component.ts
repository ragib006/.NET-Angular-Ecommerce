import { Component} from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import {ProductsService} from './services/products.service';
import {NavbarComponent} from './navbar/navbar.component'
import {Product} from './types/product';

import {
  /* . . . */
  NgFor,
  /* . . . */
} from '@angular/common';


import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-first-project';




}
