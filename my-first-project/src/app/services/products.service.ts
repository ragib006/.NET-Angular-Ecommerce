import { Injectable } from '@angular/core';
import {Product} from '../types/product';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouterLink,ActivatedRoute,Router } from '@angular/router';

import { jwtDecode } from "jwt-decode";

import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl = "http://localhost:5039/api/Product";

  authapiUrl = "http://localhost:5039/api/User";

  private userPayload:any;

  constructor(private http:HttpClient,private router:Router) { 

    this.userPayload = this.decodeToken();
  }

getProducts=():Observable<Product[]>=> this.http.get<Product[]>(this.apiUrl);

addProduct=(data:Product)=>this.http.post(this.apiUrl,data);

getSingleProduct=(id:number):Observable<Product>=>this.http.get<Product>(this.apiUrl+'/'+id);

//updateProduct=(id:number,data:Product)=>this.http.put(this.apiUrl+'/'+id,data);

  addmyProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }



   getmyoneProduct(productId: number): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<Product>(url);
  }


 //   updatemyProduct(newProduct: Product): Observable<Product> {
 //   const url = `${this.apiUrl}/${newProduct.id}`;
 //   return this.http.put<Product>(url, newProduct);
  //}


   updatemyProduct(newProduct: Product): Observable<Product> {
    const url = `${this.apiUrl}/${newProduct.id}`;
    return this.http.put<Product>(url, newProduct);
  }



    deletemyProduct(productId: number): Observable<void> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<void>(url);

}



signUp(userObj:any){

 return this.http.post<any>(`${this.authapiUrl}/register`,userObj);

}

logIn(userObj:any){

 return this.http.post<any>(`${this.authapiUrl}/login`,userObj);

}



getUsers(){

 return this.http.get<any>(`${this.authapiUrl}/alluser`);

}


signOut(){

localStorage.clear();

//const router = new Router();
// router.navigate(['/login']);


}




storeToken(tokenValue:string){

localStorage.setItem('token',tokenValue)

}

getToken(){

localStorage.getItem("token")

}



  getUserInfo(token: string): any {
    try {
      const decodedToken: any = jwtDecode(token);
      return {
        id: decodedToken.nameid,
        name: decodedToken.unique_name,
        email: decodedToken.email
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }





isLoggedIn(): boolean{

return !!localStorage.getItem("token")

//if token return true otherwise false

}



decodeToken(){

  const JwtHelper = new JwtHelperService();
  
  const token = localStorage.getItem("token")!;
  
  console.log(JwtHelper.decodeToken(token))
  return JwtHelper.decodeToken(token);

}


getfullNameFromToken(){

  

}


getRoleFromToken(){


	
}


}














