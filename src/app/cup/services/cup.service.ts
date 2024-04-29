import { Injectable } from '@angular/core';
import { Cup } from '@cup/models/cup.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { RequestDataInput } from '@cup/models/request-data-input';
import { UserFilter } from '@cup/filterCriteria/user-filter';
import { DefaultFilter } from '@cup/filterCriteria/default-filter';
import { Criteria } from '@cup/filterCriteria/criteria';

@Injectable()
export class CupService {

  public cupPath: string = environment.apiCups;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public authService: AuthService,
  ) { }

  getAllCups(page: number, cupsPerPage: number, criteria: Criteria): Observable<RequestDataInput> {
    const userFilter: UserFilter = new UserFilter(this.httpClient);
    const defaultFilter: DefaultFilter = new DefaultFilter(this.httpClient);
    userFilter.setNext(defaultFilter);
    return userFilter.applyFilter(page, cupsPerPage, criteria);
    // const totalPath: string = this.cupPath + '?' + 'page=' + page + '&size=' + cupsPerPage;
    // return this.httpClient.get<RequestDataInput>(totalPath);
  }

  getAllCupsSearch(page: number, cupsPerPage: number, searchString: string): Observable<RequestDataInput>{
    const totalPath: string = this.cupPath + '/search/' + searchString + '?page=' + page + '&size=' + cupsPerPage;
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

  create(cup: Cup, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("userId", this.authService.getId().toString());
    formData.append("file", file!);
    formData.append("cup", JSON.stringify(cup));
    return this.httpClient.post(this.cupPath, formData);
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
          console.log('Something wrong at delete: ' + error);
        }
      }
    );
  }

  updateCup(cup: Cup, file: File): Observable<Cup>{
    const formData: FormData = new FormData();
    formData.append('cup', JSON.stringify(cup));
    formData.append('file', file);
    return this.httpClient.put<Cup>(this.cupPath, formData);
  }
}
