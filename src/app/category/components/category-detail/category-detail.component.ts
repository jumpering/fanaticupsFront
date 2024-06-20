import { Component, OnInit } from '@angular/core';
import { CupModule } from "../../../cup/cup.module";
import { CategoryService } from '../../services/category.service';
import { CriteriaService } from '@cup/services/criteria.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-category-detail',
    standalone: true,
    templateUrl: './category-detail.component.html',
    styleUrl: './category-detail.component.scss',
    imports: [CupModule]
})
export class CategoryDetailComponent implements OnInit{
  
  constructor(
    public categoryService: CategoryService, 
    private criteriaService: CriteriaService,
    private activatedRoute: ActivatedRoute){}
  
  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params: Params) => {
      const id: number = params['id'];
      const criteria = {
        userId: undefined,
        cupName: '',
        cupDescription: '',
        showFavorites: false,
        categoryId: id
      }
      this.criteriaService.setCriteria(criteria);
    });
  }

}
