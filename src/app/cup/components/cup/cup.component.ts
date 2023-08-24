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
  @Output() viewDescriptionClicked = new EventEmitter<string>();
 
  viewDescription(){
    this.viewDescriptionClicked.emit(this.cup.description);
  }

}
