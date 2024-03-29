import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '@auth/models/Credentials';
import { Observable, map, observable, of } from 'rxjs';
import * as JWT from 'jwt-decode';
import { environment } from 'src/environments/environment';

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
    return this.httpClient.post(environment.apiRegister, credentials, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;
      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken.replace('Bearer ', '');
      localStorage.setItem('token', token);
      this.currentToken = token;
      this.authenticated = true;
      return body;
    }))
  }

  login(credentials: Credentials) {
      return this.httpClient.post(environment.apiAuthenticate, credentials, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;
      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken.replace('Bearer ', '');
      localStorage.setItem('token', token);
      this.currentToken = token;
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
  rol: string; //todo, is not a string! not implemented
  id: number;
  sub: string;
  // whatever else is in the JWT.
}
