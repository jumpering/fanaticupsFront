import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '@material/material.module';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

  public isActiveMessage: boolean = true;
  @Output() childEvent = new EventEmitter<boolean>();

  emitEvent() {
    this.isActiveMessage = false;
    this.childEvent.emit(false);
  }

}
