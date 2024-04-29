import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cup } from '../../models/cup.model';
import { CupService } from '@cup/services/cup.service';
import { BreakpointService } from 'src/app/utils/breakpoint.service';
import { Observable, debounceTime } from 'rxjs';
import { SearchService } from '@shared/services/search.service';
import { Criteria } from '@cup/filterCriteria/criteria';


@Component({
  selector: 'app-cup-list',
  // standalone: true,
  // imports: [],
  templateUrl: './cup-list.component.html',
  styleUrls: ['./cup-list.component.scss'],
})
export class CupListComponent implements OnInit {

  public listOfCups: Cup[] = [];
  public page: number = 0;
  public cupsPerPage: number = 12;
  public isFirst: boolean = false;
  public isLast: boolean = false;
  public isHandset$!: Observable<boolean>;
  public searchString: string = '';
  public showLoading: boolean = false;
  @Input() criteria!: Criteria;
 
  constructor(
    private cupService: CupService,
    private router: Router,
    private breakpointService: BreakpointService,
    private searchService: SearchService
    ) {
      this.criteria = {
        userId: undefined,
        cupName: '',
        cupDescription:''
      }
    }

    //TODO search aquí?
  ngOnInit(): void {
    this.getAllCups(this.criteria);
    this.isHandset$ = this.breakpointService.isHandset$;
    this.searchService.searchTermChanged.pipe(debounceTime(300)).subscribe((searchTerm: string) => {
      this.searchString = searchTerm;
      if(this.searchString == ''){
        this.resetPageable();
        this.listOfCups = [];
        this.getAllCups(this.criteria);
      }else {
        this.resetPageable();
        this.listOfCups = [];
        this.getAllCupsFilteredSearch(); 
      }
    });
  }

  //TODO DRY!
  public getAllCups(criteria: Criteria): void {
    this.showLoading = true;
    this.cupService.getAllCups(this.page, this.cupsPerPage, criteria).subscribe(requestDataInput => {
      this.page = requestDataInput.number;
      this.isFirst = requestDataInput.first;
      this.isLast = requestDataInput.last;
      this.showLoading = false;
      this.listOfCups.push(...requestDataInput.content);
    });
  }

  //TODO search aquí? ...debería desacoplarme y hacer un provider en un componente padre?
  public getAllCupsFilteredSearch(): void {
    this.cupService.getAllCupsSearch(this.page, this.cupsPerPage, this.searchString).subscribe(requestDataInput => {
      this.page = requestDataInput.number;
      this.isFirst = requestDataInput.first;
      this.isLast = requestDataInput.last;
      this.listOfCups.push(...requestDataInput.content);  
    });
  }

  private resetPageable(): void {
    this.page = 0;
    this.isFirst = false;
    this.isLast = false;
  }

  public onScrollDown(){
    this.page++;
    if(this.isLast !== true){
      this.getAllCups(this.criteria);
    }
  }

  public onBuyClicked(id: number){
    //console.log("buy ID cup: " + id);
  }

  public onDetailClicked(id: number){
    this.router.navigate(['/', id]);
  }

  public onCreateClicked(cup: Cup){
    //this.cupService.
  }

}