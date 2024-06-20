import { Component, OnInit } from '@angular/core';
import { CupModule } from "../../cup.module";
import { MaterialModule } from '@material/material.module';
import { CommonModule } from '@angular/common';
import { Criteria } from '@cup/filterCriteria/criteria';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';
import { BreakpointService } from 'src/app/utils/breakpoint.service';
import { CriteriaService } from '@cup/services/criteria.service';

@Component({
  selector: 'app-cup-profile',
  standalone: true,
  templateUrl: './cup-profile.component.html',
  styleUrl: './cup-profile.component.scss',
  imports: [CupModule, MaterialModule, CommonModule]
})
export class CupProfileComponent implements OnInit {

  public isMyCupsSelected: boolean = false;
  public isFavoritesSelected: boolean = false;
  public isHandset$!: Observable<boolean>;
  //public criteria!: Criteria;

  constructor(public authService: AuthService, private breakpointService: BreakpointService, public criteriaService: CriteriaService) { }

  ngOnInit(): void {
    this.isHandset$ = this.breakpointService.isHandset$;
  }

  public loadMyCups(): void {
    this.isMyCupsSelected = true;
    this.isFavoritesSelected = false;
    
    const criteria: Criteria = {
      userId: this.authService.getId(),
      cupName: '',
      cupDescription: '',
      showFavorites: false,
      categoryId: undefined
    }
    this.criteriaService.setCriteria(criteria);
  }

  public loadFavorites(): void {
    this.isMyCupsSelected = false;
    this.isFavoritesSelected = true;
    const criteria: Criteria = {
      userId: this.authService.getId(),
      cupName: '',
      cupDescription: '',
      showFavorites: true,
      categoryId: undefined
    }
    this.criteriaService.setCriteria(criteria);
  }
}
