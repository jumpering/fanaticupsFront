import { RequestDataInput } from "@cup/models/request-data-input";
import { Observable } from "rxjs";
import { Criteria } from "./criteria";
import { FilterCriteriaChain } from "./filter-criteria-chain";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

export class DefaultFilter implements FilterCriteriaChain {

    private nextFilter!: FilterCriteriaChain;
    public cupPath: string = environment.apiCups;

    constructor(
        private httpClient: HttpClient,
    ) { }

    setNext(filter: FilterCriteriaChain): void {
        this.nextFilter = filter;
    }

    applyFilter(page: number, cupsPerPage: number, criteria: Criteria): Observable<RequestDataInput> {

        // if (criteria.userId == undefined) {
        //     return this.nextFilter.applyFilter(page, cupsPerPage, criteria);
        // }
        const totalPath: string = this.cupPath + '?' + 'page=' + page + '&size=' + cupsPerPage;
        return this.httpClient.get<RequestDataInput>(totalPath);
    }

}