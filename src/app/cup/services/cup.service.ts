import { Injectable } from '@angular/core';
import { Cup } from '@cup/models/cup.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CupService {

  constructor( private httpClient: HttpClient) { }

  getAllCups() : Observable<Cup[]>{
    return this.httpClient.get<Cup[]>('http://localhost:3000/cups');
  }
} 
