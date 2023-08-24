import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public title: string = 'Fanaticups';
  public inputVar: string = "";
 


  public changeTitle(){
    this.title = "Fanaticups".toUpperCase();
  }

}
