import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public uloadImageFilePath = 'http://localhost:8080/files';

  constructor(private http: HttpClient) { }

  public uploadImage(formData: FormData): Observable<string>{
    return this.http.post<string>(this.uloadImageFilePath, formData, {responseType:'text' as 'json'});
  }

  public updateImage(formData: FormData): Observable<string>{
    return this.http.put<string>(this.uloadImageFilePath, formData, {responseType:'text' as 'json'});
  }
}
