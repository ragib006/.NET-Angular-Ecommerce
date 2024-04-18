import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

   const myToken = localStorage.getItem("token");
    //product service a login in hoyer somoy token name a stor korcilam seta get korlam

   const cloneRequest = req.clone({

      setHeaders:{

        Authorization:`Bearer ${myToken}`

      }


   });

  return next(cloneRequest);
};
