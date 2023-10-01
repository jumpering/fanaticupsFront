import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public title: string = 'Fanaticups';
  public inputVar: string = "";
 
  constructor(
    private router: Router,
  ){}

  public changeTitle(){
    this.title = "Fanaticups".toUpperCase();
  }

  // toHome() {
  //   this.router.navigate(['/cups']);
  // }

}
