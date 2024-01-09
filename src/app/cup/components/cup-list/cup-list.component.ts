import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cup } from '../../models/cup.model';
import { CupService } from '@cup/services/cup.service';

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

  constructor(
    private cupService: CupService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getAllCups();
  }

  public getAllCups(): void {
    this.cupService.getAllCups(this.page, this.cupsPerPage).subscribe(requestDataInput => {
      this.page = requestDataInput.number;
      this.isFirst = requestDataInput.first;
      this.isLast = requestDataInput.last;
      this.listOfCups.push(...requestDataInput.content);  
    });
  }

  public onScrollDown(){
    this.page++;
    console.log('valor de page: ' + this.page);
    if(this.isLast !== true){
      this.getAllCups();
    }
  }

  public onBuyClicked(id: number){
    console.log("buy ID cup: " + id);
  }

  public onDetailClicked(id: number){
    this.router.navigate(['/', id]);
  }

  public onCreateClicked(cup: Cup){
    //this.cupService.
  }

}
