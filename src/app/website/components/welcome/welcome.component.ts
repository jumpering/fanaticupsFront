import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '@material/material.module';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

  public displayWelcome: boolean = true;

  public disableDisplayWelcome(){
    this.displayWelcome = false;
  }

}
