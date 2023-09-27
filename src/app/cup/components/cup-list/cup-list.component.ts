import { Component, OnInit } from '@angular/core';
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

  constructor(
    private cupService: CupService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.cupService.getAllCups().subscribe(data => this.listOfCups = data);
  }

  public onBuyClicked(id: number){
    console.log("buy ID cup: " + id);
  }

  public onDetailClicked(id: number){
    this.router.navigate(['/cups', id]);
  }

}
