import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '@auth/models/Credentials';
import { Observable, map, observable, of } from 'rxjs';
import { setTimeout } from 'timers';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  authenticated: boolean = false;
  currentToken: string =  '';

  constructor(
    private httpClient: HttpClient
  ) { }

  login(credentials: Credentials) {
    return this.httpClient.post('http://localhost:8080/authenticate', credentials, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;
      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken.replace('Bearer ', '');
      localStorage.setItem('token', token);
      this.currentToken = token;
      console.log('set: ', this.currentToken);
      this.authenticated = true;
      return body;
    }))
  }

  getToken(){
    return localStorage.getItem('token');
  }  

  hasSession(): Observable<boolean>{
    // if(localStorage.getItem('token') !== null){
    //   return of(true);
    // } else {
    //   return of(false);
    // }
    return localStorage.getItem('token') !== null ? of(true) : of(false);
  }

  signup(credentials: Credentials) {
    return this.httpClient.post('http://localhost:8080/register', credentials, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;
      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken.replace('Bearer ', '');
      localStorage.setItem('token', token);
      this.currentToken = token;
      console.log('set: ', this.currentToken);
      this.authenticated = true;
      return body;
    }))

  }
}
