import { Injectable } from "@angular/core";
import { Criteria } from "@cup/filterCriteria/criteria";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class CriteriaService{

    private dataSource = new BehaviorSubject<any>(null);
    private dataCriteria = this.dataSource.asObservable();

    public setCriteria (criteria: Criteria) : void{
        this.dataSource.next(criteria);
    }

    public getCriteria() : Observable<Criteria>{
        return this.dataCriteria;
    }
}