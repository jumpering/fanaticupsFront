import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { AuthService } from '@auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //const token = this.authService.getToken();
    const token = localStorage.getItem('token');
    let existToken = token !== null;
    console.log('TRAZA token: ', token);
    console.log('existe token en locastorage?', existToken);

    if(existToken){
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
    }
     return next.handle(request);

  }
}