import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public url: string = environment.apiChat;


  constructor(
    private httpClient: HttpClient
    ) { }

    public add(message: string): void{
      this.httpClient.post<string>(this.url, message);
    }

    public getAllMessages(cupId: number | undefined): Observable<Message[]> {
      return this.httpClient.get<Message[]>(this.url + '/' + cupId);
    }
}
