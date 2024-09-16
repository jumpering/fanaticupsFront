import { Injectable } from "@angular/core";
import { Criteria } from "@cup/filterCriteria/criteria";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class CriteriaService{

    private dataSource = new BehaviorSubject<any>(null);
    private dataCriteria = this.dataSource.asObservable();
    private defaultCriteria: Criteria = {
        userId: undefined,
        cupName: '',
        cupDescription: '',
        showFavorites: false,
        categoryId: undefined
      }

    public setCriteria (criteria: Criteria) : void{
        this.dataSource.next(criteria);
    }

    public getCriteria() : Observable<Criteria>{
        return this.dataCriteria;
    }

    public setDefaultCriteria() : void {
        this.dataSource.next(this.defaultCriteria);
    }

    public getDefaultCriteria() : Criteria {
        return this.defaultCriteria;
    }
}