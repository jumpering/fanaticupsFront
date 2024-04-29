import { Component, OnInit } from '@angular/core';
import { CupModule } from "../../cup.module";
import { MaterialModule } from '@material/material.module';
import { CommonModule } from '@angular/common';
import { Criteria } from '@cup/filterCriteria/criteria';
import { AuthService } from '@auth/services/auth.service';

@Component({
    selector: 'app-cup-profile',
    standalone: true,
    templateUrl: './cup-profile.component.html',
    styleUrl: './cup-profile.component.scss',
    imports: [CupModule, MaterialModule, CommonModule]
})
export class CupProfileComponent implements OnInit{

  public isMyCupsSelected: boolean = false;
  public isFavoritesSelected: boolean = false;
  public criteria: Criteria = {
      userId: this.authService.getId(),
      //userId: 22,
      cupName: '',
      cupDescription:''  
  }

  constructor(public authService: AuthService){}

  ngOnInit(): void {
    // console.log('estado de isMyCupSelected: ' + this.isMyCupsSelected);
  }

  public loadMyCups(): void{
    this.isMyCupsSelected = true;
    this.isFavoritesSelected = false;
  }

  public loadFavorites(): void{
    this.isMyCupsSelected = false;
    this.isFavoritesSelected = true;
  }
}
