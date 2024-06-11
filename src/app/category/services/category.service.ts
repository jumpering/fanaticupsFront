import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
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
        private router: Router,
        public authService: AuthService,
      ) { }

      getAllCategories(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(this.categoryPath);
      }
}