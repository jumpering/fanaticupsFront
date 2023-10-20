import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '@auth/models/Credentials';
import { Observable, map, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {



  constructor(
    private httpClient: HttpClient
  ) { }

  login(credentials: Credentials) {
    console.log('traza!!!!');
    return this.httpClient.post('http://localhost:8080/authenticate', credentials, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      console.log('traza dentro del pipe y map');
      const body = response.body;
      const headers = response.headers;

      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken.replace('Bearer ', '');
      console.log('TOKEN: ', token);

      localStorage.setItem('token', token);
      return body;
    }))
  }

  getToken(){
    return localStorage.getItem('token');
  }  

  hasSession(){

    return true;
  }
}
