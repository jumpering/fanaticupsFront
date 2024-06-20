import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '@material/material.module';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  @Input() category!: Category;
  @Output() categoryIdEventEmitter = new EventEmitter<number>();

  constructor(){}

  onClickCategory(): void{
    this.categoryIdEventEmitter.emit(this.category.id);

  }

}
