import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isActiveMessage = true;

  constructor() { }

  ngOnInit(): void {
  }

  handleChildEvent(event: boolean) {
    this.isActiveMessage = event;
  }

}
