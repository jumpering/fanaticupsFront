import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@auth/services/auth.service";
import { environment } from "src/environments/environment";
import { Category } from "../models/category";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    public categoryPath: string = environment.apiCategories;

    constructor(
        private httpClient: HttpClient,
        public authService: AuthService,
      ) { }

      getAllCategories(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(this.categoryPath);
      }

      addCategoriesToCupId(cupId:number, categories: number[]): Observable<string>{
        const body = {cupId, categories}
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.post<string>(this.categoryPath + `/cup`, body, { headers });
      }
}