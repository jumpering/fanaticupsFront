import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '@material/material.module';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chips-list',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './chips-list.component.html',
  styleUrl: './chips-list.component.scss'
})
export class ChipsListComponent implements OnInit{

  public categories!: Category[];
  public selectedCategoriesIndices: number[] = [];
  @Output() addCategories = new EventEmitter<number[]>();

  constructor(public categoryService: CategoryService){}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: category => this.categories = category
    });
  }

  toggleSelection(categoryId: number) {
    const selectedIndex = this.selectedCategoriesIndices.indexOf(categoryId);
    if (selectedIndex === -1) {
      this.selectedCategoriesIndices.push(categoryId);
    } else {
      this.selectedCategoriesIndices.splice(selectedIndex, 1);
    }
    this.addCategories.emit(this.selectedCategoriesIndices);
  }

  isSelected(index: number): boolean {
    return this.selectedCategoriesIndices.includes(index);
  }
  

}
