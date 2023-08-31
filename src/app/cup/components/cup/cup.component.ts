import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cup } from '@cup/models/cup.model';

@Component({
  selector: 'app-cup',
  templateUrl: './cup.component.html',
  styleUrls: ['./cup.component.scss']
})
export class CupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() cup!: Cup;
  @Output() buy = new EventEmitter<number>();
  @Output() detail = new EventEmitter<number>();
 
  viewDescription(){
    this.buy.emit(this.cup.id);
  }

  showDetail(){
    this.detail.emit(this.cup.id);
  }

}
