import { Injectable } from '@angular/core';
import { Cup } from '@cup/models/cup.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Injectable()
export class CupService {

  public cupPath = 'http://localhost:8080/cups';
  public uloadImageFilePath = 'http://localhost:8080/files';

  constructor( 
    private httpClient: HttpClient,
    private router: Router,
    public authService: AuthService,
    ) { }

  getAllCups() : Observable<Cup[]>{
    return this.httpClient.get<Cup[]>(this.cupPath);
  }

  getById(id: number) : Observable<Cup> {
    return this.httpClient.get<Cup>(this.cupPath + '/' + id);
  }

  create(cup: Cup, file: File | undefined){
    const formData = new FormData();
    formData.append("file", file!);
    formData.append("cupName",cup.name.toString());
    formData.append("userId", this.authService.getId().toString());

    let request: RequestInfo = {
      userId: this.authService.getId().toString(),
      cup: JSON.stringify(cup)
    }

    return this.httpClient.post(this.cupPath, request).subscribe(
      result => {
        this.httpClient.post(this.uloadImageFilePath, formData).subscribe(
          result => {},
          error => {}
        );
        const responseCup: any = result;
        this.router.navigate(['/' + responseCup.id]);
      },
      error => {}
      );
  }
} 

interface RequestInfo{
  userId: string;
  cup: string;
}
