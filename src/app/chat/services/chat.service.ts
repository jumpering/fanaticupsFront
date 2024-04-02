import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message.model';
import { AuthService } from '@auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public url: string = environment.apiChat;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
    ) { }

    public addMessage(cupId: number | undefined, message: string): Observable<Message>{
      const formData: FormData = new FormData();
      formData.append("cupId", cupId!.toString());
      formData.append("userId", this.authService.getId().toString());
      formData.append("message", message);
      return this.httpClient.post<Message>(this.url, formData);
    }

    public getAllMessages(cupId: number | undefined): Observable<Message[]> {
      return this.httpClient.get<Message[]>(this.url + '/' + cupId);
    }
}
