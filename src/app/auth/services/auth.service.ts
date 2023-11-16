import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '@auth/models/Credentials';
import { Observable, map, observable, of } from 'rxjs';
import { setTimeout } from 'timers';
import * as JWT from 'jwt-decode';

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

  register(credentials: Credentials) {
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

  getUsername(): string | undefined{
    const token = localStorage.getItem('token');
    const decodedToken = JWT.jwtDecode<MyToken>(token!);
    var name = decodedToken['name'];
    return name;
  }
}

interface MyToken {
  name: string;
  rol: string; //todo, no es un string!
  // whatever else is in the JWT.
}
