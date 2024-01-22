import { Injectable } from '@angular/core';
import { Cup } from '@cup/models/cup.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { ImageService } from './image.service';

@Injectable()
export class CupService {

  public cupPath: string = 'http://localhost:8080/cups';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public authService: AuthService,
    private imageService: ImageService
  ) { }

  getAllCups(page: number, cupsPerPage: number): Observable<RequestDataInput> {
    const totalPath: string = this.cupPath + '?' + 'page=' + page + '&size=' + cupsPerPage;
    return this.httpClient.get<RequestDataInput>(totalPath);
  }


  existCupName(name: string): Observable<boolean> {
    const path = this.cupPath + '/existCupNameByUserId'
    const formData: FormData = new FormData();
    formData.append("userId", this.authService.getId().toString());
    formData.append("cupName", name);
    return this.httpClient.post<boolean>(path, formData);
  }

  getById(id: number): Observable<Cup> {
    return this.httpClient.get<Cup>(this.cupPath + '/' + id);
  }

  create(cup: Cup, file: File) {
    const formData: FormData = new FormData();
    formData.append("file", file!);
    formData.append("userId", this.authService.getId().toString());
    formData.append("cupName", cup.name.toString());
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

  delete(id: number) {
    const path = this.cupPath + '/' + id;
    this.httpClient.delete<void>(path, { observe: 'response' }).subscribe(
      {
        next: (response: HttpResponse<void>) => {
          if (response.status === 204) {
            console.log('response is 204, success delete');
            this.router.navigate(['/']);
          } else {
            console.log('error code: ' + response.status);
          }
        },
        error: (error) => {
          console.log('something wrong at delete' + error);
        }
      }
    );
  }

  update(cup: Cup, file: File) {
    const formData: FormData = new FormData();
    formData.append("file", file!);
    formData.append("userId", this.authService.getId().toString());
    formData.append("cupName", cup.name.toString());
    if (cup.id !== undefined) {
      formData.append("cupId", cup.id?.toString());
    }
    this.imageService.updateImage(formData).subscribe({
      next: (response) => {
        console.log('Success:', response);
        const path = this.cupPath + '/' + cup.id;

        
        this.httpClient.put<Cup>(path, JSON.stringify(cup)).subscribe({
          next: (resultCup) => {
            const responseCup: any = resultCup;
            console.log('dentro del next: del subscribe.. valor de responseCup.id: ' + responseCup.id);
            this.router.navigate(['/' + responseCup.id]);
          },
          error: (error) => {
            console.log('error: ' + error);
          }
        });
      },
      error: (error) => {
        console.log('error: ' + error);
      }
    });
  }
}

interface RequestInfo {
  userId: string;
  cup: string;
}

interface RequestDataInput {
  content: Cup[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
  }
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  },
  totalElements: number;
  totalPages: number;
}
