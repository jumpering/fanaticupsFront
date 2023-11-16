import { Injectable } from '@angular/core';
import { Cup } from '@cup/models/cup.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CupService {

  constructor( 
    private httpClient: HttpClient,
    private router: Router
    ) { }

  getAllCups() : Observable<Cup[]>{
    return this.httpClient.get<Cup[]>('http://localhost:8080/cups');
  }

  getById(id: number) : Observable<Cup> {
    return this.httpClient.get<Cup>('http://localhost:8080/cups/' + id);
  }

  create(cup: Cup){
    console.log('desde el método cupService para ver el parametro ', cup);
    return this.httpClient.post('http://localhost:8080/cups',cup).subscribe(
      result => {
        const responseCup: any = result;
        this.router.navigate(['/' + responseCup.id]);
      },
      error => {
        console.log(error);
      });
  }
} 
