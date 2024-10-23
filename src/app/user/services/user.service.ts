import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { User } from '@cup/models/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userPath: string = environment.apiUsers;

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  public setCupToFavorite(cupId: number): Observable<boolean> {
    const path = this.userPath + '/favorites/' + this.authService.getId();
    const formData: FormData = new FormData();
    formData.append("cupId", cupId.toString());
    return this.httpClient.post<boolean>(path, formData);
  }

  public isFavorite(cupId: number): Observable<boolean>{
    const path = this.userPath + '/isFavorite/' + this.authService.getId();
    const formData: FormData = new FormData();
    formData.append("cupId", cupId.toString());
    return this.httpClient.post<boolean>(path, formData);
  }

  getUser(userId: number): Observable<User> {
    const path = this.userPath + "/" + userId; 
    return this.httpClient.get<User>(path);
  }

  getByName(name: string): Observable<User[]> {
    const path = this.userPath + "/name/" + name; 
    return this.httpClient.get<User[]>(path);
  }
}
