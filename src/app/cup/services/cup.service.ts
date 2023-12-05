import { Injectable } from '@angular/core';
import { Cup } from '@cup/models/cup.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CupService {

  public path = 'http://localhost:8080/cups';

  constructor( 
    private httpClient: HttpClient,
    private router: Router
    ) { }

  getAllCups() : Observable<Cup[]>{
    return this.httpClient.get<Cup[]>(this.path);
  }

  getById(id: number) : Observable<Cup> {
    return this.httpClient.get<Cup>(this.path + '/' + id);
  }

  create(cup: Cup, userId: number){
    const path = 'http://localhost:8080/cups/' + userId;
    return this.httpClient.post(path,cup).subscribe(
      result => {
        //upload file

        const responseCup: any = result;
        this.router.navigate(['/' + responseCup.id]);
      },
      error => {
        console.log(error);
      });
  }
} 
