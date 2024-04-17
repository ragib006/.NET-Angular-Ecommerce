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

import {HomeComponent} from './home/home.component'

import {ViewproductComponent} from './viewproduct/viewproduct.component'

import {ShippingComponent} from './shipping/shipping.component'

import {AllorderComponent} from './allorder/allorder.component'



import {VieworderComponent} from './vieworder/vieworder.component'



import {authGuard} from './gurds/auth.guard'




export const routes: Routes = [


{
 path:'',
 component:HomeComponent

},


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
 path:'viewproduct/:id',
 component:ViewproductComponent

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
 path:'shipping',
 component:ShippingComponent

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

{
 path:'allorder',
 component:AllorderComponent

},

{
 path:'vieworder/:id',
 component:VieworderComponent

},



];
