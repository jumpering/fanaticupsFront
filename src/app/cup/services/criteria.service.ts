import { Injectable } from "@angular/core";
import { Criteria } from "@cup/filterCriteria/criteria";

@Injectable({
    providedIn: 'root'
  })
export class CriteriaService{

    private criteria!: Criteria;

    public setCriteria (criteria: Criteria) : void{
        this.criteria = criteria;
    }

    public getCriteria() : Criteria{
        return this.criteria;
    }
}