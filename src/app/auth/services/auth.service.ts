import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '@auth/models/Credentials';
import { Observable, map, observable, of } from 'rxjs';
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

  register(credentials: Credentials) {
    //return this.httpClient.post('http://localhost:8080/register', credentials, {
    return this.httpClient.post('https://fanaticupsback.onrender.com/register', credentials, {
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

  login(credentials: Credentials) {
    //return this.httpClient.post('http://localhost:8080/authenticate', credentials, {
    return this.httpClient.post('https://fanaticupsback.onrender.com/authenticate', credentials, {
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
    return localStorage.getItem('token') !== null ? of(true) : of(false);
  }

  getUsername(): string {
    return this.decodeToken()['name'];
  }

  private decodeToken() {
    const token = localStorage.getItem('token');
    const decodedToken = JWT.jwtDecode<MyToken>(token!);
    return decodedToken;
  }

  getEmail(): string {
    return this.decodeToken()['sub'];
  }

  getId(): number {
    return this.decodeToken()['id'];
  }

}

interface MyToken {
  name: string;
  rol: string; //todo, no es un string!
  id: number;
  sub: string;
  // whatever else is in the JWT.
}
