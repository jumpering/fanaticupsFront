import { Component, OnInit, Input } from '@angular/core';
import { Cup } from '../models/cup.model';

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

}
