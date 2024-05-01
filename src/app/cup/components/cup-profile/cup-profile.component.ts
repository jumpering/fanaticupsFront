import { Component, OnInit } from '@angular/core';
import { CupModule } from "../../cup.module";
import { MaterialModule } from '@material/material.module';
import { CommonModule } from '@angular/common';
import { Criteria } from '@cup/filterCriteria/criteria';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';
import { BreakpointService } from 'src/app/utils/breakpoint.service';

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
  public isHandset$!: Observable<boolean>;
  public criteria: Criteria = {
      userId: this.authService.getId(),
      cupName: '',
      cupDescription:''  
  }

  constructor(public authService: AuthService, private breakpointService: BreakpointService){}

  ngOnInit(): void {
    this.isHandset$ = this.breakpointService.isHandset$;
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
