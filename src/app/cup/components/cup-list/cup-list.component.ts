import { Component, OnInit } from '@angular/core';
import { Cup } from '../../models/cup.model';
import { CupService } from '@cup/services/cup.service';

@Component({
  selector: 'app-cup-list',
  templateUrl: './cup-list.component.html',
  styleUrls: ['./cup-list.component.scss']
})
export class CupListComponent implements OnInit {

  public listOfCups: Cup[] = [];

  constructor(private cupService: CupService) { }

  ngOnInit(): void {
    this.cupService.getAllCups().subscribe(data => this.listOfCups = data);
  }

  public onViewDescriptionClicked(description: string){
    console.log("descripción: " + description);
  }

}
