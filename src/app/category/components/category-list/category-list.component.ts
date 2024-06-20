import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { CategoryComponent } from "../category/category.component";
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-category-list',
    standalone: true,
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss',
    imports: [CategoryComponent, CommonModule, RouterOutlet]
})
export class CategoryListComponent implements OnInit{

  public listOfCategories!: Category[];

  constructor(
    public categoryService: CategoryService, 
    private router: Router){}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      categories => this.listOfCategories = categories
    );
  }

  onCategoryClicked(id: number){
    // console.log('Category clicked: ' + id);
    // const criteria = {
    //   userId: undefined,
    //   cupName: '',
    //   cupDescription: '',
    //   showFavorites: false,
    //   categoryId: id
    // }
    // this.criteriaService.setCriteria(criteria);
    
    //this.router.navigate(['/categories/cat/', id]);
    this.router.navigate(['/categories/', id]);

  }

}
