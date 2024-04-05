import { CanActivateFn,Router } from '@angular/router';
import {ProductsService} from '../services/products.service';
export const authGuard: CanActivateFn = (route, state) => {



 

const tokenValue = localStorage.getItem("token");

if(tokenValue != null){

return true;

	

}else{


   const router = new Router();
        router.navigate(['/login']);
	// router.navigate(['/login']);
	 return false;

}




};
