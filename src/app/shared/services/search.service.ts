import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  searchTermChanged: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

}
