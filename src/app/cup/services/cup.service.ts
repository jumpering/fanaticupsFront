import { Injectable } from '@angular/core';
import { Cup } from '@cup/models/cup.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CupService {

  constructor( private httpClient: HttpClient) { }

  getAllCups() : Observable<Cup[]>{
    
    return this.httpClient.get<Cup[]>('http://localhost:8080/cups');
  }

  getById(id: number) : Observable<Cup> {

    return this.httpClient.get<Cup>('http://localhost:8080/cups/' + id);
  }

  create(cup: Cup){
    return this.httpClient.post('http://localhost:8080/cups',cup).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      });
  }
} 
