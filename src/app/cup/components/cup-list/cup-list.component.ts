import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cup } from '../../models/cup.model';
import { CupService } from '@cup/services/cup.service';
import { debounceTime, Subscription } from 'rxjs';
import { SearchService } from '@shared/services/search.service';
import { Criteria } from '@cup/filterCriteria/criteria';
import { CriteriaService } from '@cup/services/criteria.service';


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
  public searchString: string = '';
  public showLoading: boolean = false;
  private criteria!: Criteria;
  private criteriaSubscription!: Subscription; //for unsubscribe

  constructor(
    private cupService: CupService,
    private router: Router,
    private searchService: SearchService,
    private criteriaService: CriteriaService
  ) { }

  //TODO search aquí?
  ngOnInit(): void {
    this.criteriaSubscription = this.criteriaService.getCriteria().subscribe(element => {
      this.criteria = element;
      this.getAllCups(this.criteria);
    });
    this.searchService.searchTermChanged.pipe(debounceTime(300)).subscribe((searchTerm: string) => {
      this.searchString = searchTerm;
      this.criteria.cupName = searchTerm;
      this.resetPageable();
      this.listOfCups = [];
      this.getAllCups(this.criteria);
    });
  }

  ngOnDestroy(): void {
    this.criteriaSubscription.unsubscribe();
  }

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

  private resetPageable(): void {
    this.page = 0;
    this.isFirst = false;
    this.isLast = false;
  }

  public onScrollDown() {
    if (this.isLast != true) {
      this.page++;
      this.getAllCups(this.criteria);
    }
  }

  public onScrollUp() {
    console.log('up!');
  }

  public onBuyClicked(id: number) {
    //console.log("buy ID cup: " + id);
  }

  public onDetailClicked(id: number) {
    this.router.navigate(['/', id]);
  }

  public onCreateClicked(cup: Cup) {
    //this.cupService.
  }

}