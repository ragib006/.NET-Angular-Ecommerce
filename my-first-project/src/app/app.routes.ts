import { Routes } from '@angular/router';
import {ProductsComponent} from './products/products.component'
import {AddProductComponent} from './add-product/add-product.component'

import {EditProductComponent} from './edit-product/edit-product.component'

import {ProductEditComponent} from './product-edit/product-edit.component'

import {LoginComponent} from './login/login.component'

import {SignupComponent} from './signup/signup.component'

import {OrderComponent} from './order/order.component'

import {CartComponent} from './cart/cart.component'

import {UserComponent} from './user/user.component'



import {authGuard} from './gurds/auth.guard'




export const routes: Routes = [

{
 path:'products',
 component:ProductsComponent

},


{
 path:'addproduct',
 component:AddProductComponent

},

{
 path:'editproduct/:id',
 component:EditProductComponent

},

{
 path:'productedit/:id',
 component:ProductEditComponent

},

{
 path:'login',
 component:LoginComponent

},

{
 path:'signup',
 component:SignupComponent

},

{
 path:'cart',
 component:CartComponent

},

{
 path:'user',
 component:UserComponent

},


{
 path:'order',
 component:OrderComponent,
 canActivate:[authGuard]

},



];
