import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { CategoryComponent } from "../category/category.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-category-list',
    standalone: true,
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss',
    imports: [CategoryComponent, CommonModule]
})
export class CategoryListComponent implements OnInit{

  public listOfCategories!: Category[];

  constructor(public categoryService: CategoryService){

  }
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      categories => this.listOfCategories = categories
    );
  }

}
