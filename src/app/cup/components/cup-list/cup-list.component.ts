import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Cup } from '../../models/cup.model';
import { CupService } from '@cup/services/cup.service';
import { BreakpointService } from 'src/app/utils/breakpoint.service';
import { Observable, Subject, debounceTime } from 'rxjs';
import { SearchService } from '@shared/services/search.service';
//import { NgxMasonryComponent } from 'ngx-masonry';


@Component({
  selector: 'app-cup-list',
  templateUrl: './cup-list.component.html',
  styleUrls: ['./cup-list.component.scss']
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
  //@ViewChild(NgxMasonryComponent) masonry!: NgxMasonryComponent;

  constructor(
    private cupService: CupService,
    private router: Router,
    private breakpointService: BreakpointService,
    private searchService: SearchService
    ) { }

  ngOnInit(): void {
    this.getAllCups();
    this.isHandset$ = this.breakpointService.isHandset$;
    this.searchService.searchTermChanged.pipe(debounceTime(300)).subscribe((searchTerm: string) => {
      this.searchString = searchTerm;
      //this.reloadMasonry();
      if(this.searchString == ''){
        this.resetPageable();
        this.listOfCups = [];
        this.getAllCups();
      }else {
        this.resetPageable();
        this.listOfCups = [];
        this.getAllCupsFilteredSearch(); 
      }
    });
  }

  public getAllCups(): void {
    this.showLoading = true;
    this.cupService.getAllCups(this.page, this.cupsPerPage).subscribe(requestDataInput => {
      this.page = requestDataInput.number;
      this.isFirst = requestDataInput.first;
      this.isLast = requestDataInput.last;
      this.showLoading = false;
      this.listOfCups.push(...requestDataInput.content); 
    });
  }

  public getAllCupsFilteredSearch(): void {
    this.cupService.getAllCupsFilteredSearch(this.page, this.cupsPerPage, this.searchString).subscribe(requestDataInput => {
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
      //this.reloadMasonry();
      this.getAllCups();
    }
  }

  private reloadMasonry(): void{
    //this.masonry.ngOnInit();
    //this.masonry.reloadItems();
    //this.masonry.layout(); 
    //this.masonry.reloadItems();
    //this.masonry.ordered = true;
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
