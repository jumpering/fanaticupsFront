import { RequestDataInput } from "@cup/models/request-data-input";
import { Criteria } from "./criteria";
import { Cup } from "@cup/models/cup.model";
import { Observable } from "rxjs";

export interface FilterCriteriaChain {
    
    setNext(filter: FilterCriteriaChain): void;

    applyFilter(page: number, cupsPerPage: number, criteria: Criteria): Observable<RequestDataInput>;
}