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

  getById(id: number) : Cup {
    //fake to test
    console.log('id recibido en cupService: ', id);
    return {
      id: 100,
      name: "Mushroom",
      description: "Mushroom style mug, with dots on top, bla,bla,bla, descripcion muy larga, para probar descripciones largas cortadas",
      origin: "Fance",
      image: "assets/images/cup1.jpg"
    }
  }
} 
