import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(private userService: StorageService,private router: Router,private toastr: ToastrService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.userService.getToken();
        if(token) {
            req = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token)
            })
        }
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) : Observable<never> => {
                if (error.status === 401) {
                  this.router.navigate(['']);
                  const err = new Error('Token expired');
                  this.toastr.info("Your authentication token expired. Login again")
                  return throwError(()=>err);
                }
                const err5xx = new Error('internal error')
                return throwError(()=>err5xx);
              })
        );
    } 
}

export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}
]

