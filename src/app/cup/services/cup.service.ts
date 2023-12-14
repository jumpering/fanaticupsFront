import { Injectable } from '@angular/core';
import { Cup } from '@cup/models/cup.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { ImageService } from './image.service';

@Injectable()
export class CupService {

  public cupPath = 'http://localhost:8080/cups';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public authService: AuthService,
    private imageService: ImageService
  ) { }

  getAllCups(): Observable<Cup[]> {
    return this.httpClient.get<Cup[]>(this.cupPath);
  }

  existCupName(name: string): Observable<boolean>{
    const path = this.cupPath + '/findCupName'
    const formData: FormData = new FormData();
    formData.append("userId", this.authService.getId().toString());
    formData.append("cupName", name);
    return this.httpClient.post<boolean>(path, formData);
  }

  getById(id: number): Observable<Cup> {
    return this.httpClient.get<Cup>(this.cupPath + '/' + id);
  }

  create(cup: Cup, file: File | undefined) {
    const formData: FormData = new FormData();
    formData.append("file", file!);
    formData.append("cupName", cup.name.toString());
    formData.append("userId", this.authService.getId().toString());
    let request: RequestInfo = {
      userId: this.authService.getId().toString(),
      cup: JSON.stringify(cup)
    }

    this.imageService.uploadImage(formData).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.httpClient.post(this.cupPath, request).subscribe({
          next: (resultCup) => {
            const responseCup: any = resultCup;
            this.router.navigate(['/' + responseCup.id]);
          },
          error: (error) => {
            console.log(error);
          }
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}

interface RequestInfo {
  userId: string;
  cup: string;
}
