import { Component, OnInit } from '@angular/core';
import { CupModule } from "../../../cup/cup.module";
import { Observable } from 'rxjs';
import { BreakpointService } from 'src/app/utils/breakpoint.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Criteria } from '@cup/filterCriteria/criteria';
import { CriteriaService } from '@cup/services/criteria.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CupModule, CommonModule, FormsModule]
})
export class HomeComponent implements OnInit {

  public isHandset$!: Observable<boolean>;
  public criteria!: Criteria;

  constructor(private breakpointService: BreakpointService, public criteriaService: CriteriaService) { }

  ngOnInit(): void {
    this.isHandset$ = this.breakpointService.isHandset$;
    const criteria: Criteria = {
      userId: undefined,
      cupName: '',
      cupDescription: '',
      showFavorites: false,
      categoryId: undefined
    }
    this.criteriaService.setCriteria(criteria);
  }
}
