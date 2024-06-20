import { environment } from "src/environments/environment";
import { FilterCriteriaChain } from "./filter-criteria-chain";
import { HttpClient } from "@angular/common/http";
import { Criteria } from "./criteria";
import { Observable } from "rxjs";
import { RequestDataInput } from "@cup/models/request-data-input";

export class CategoryFilter{
    
    private nextFilter!: FilterCriteriaChain;
    public cupPath: string = environment.apiCategories;

    constructor(
        private httpClient: HttpClient,
      ) { }

    setNext(filter: FilterCriteriaChain): void {
        this.nextFilter = filter;    
    }

    applyFilter(page: number, cupsPerPage: number, criteria: Criteria): Observable<RequestDataInput> {
        if(criteria.categoryId == undefined){
            return this.nextFilter.applyFilter(page, cupsPerPage, criteria);
        }

        const totalPath: string = this.cupPath + '/' + criteria.categoryId + '/cups' + '?page=' + page + '&size=' + cupsPerPage;
        return this.httpClient.get<RequestDataInput>(totalPath);   
    }
}