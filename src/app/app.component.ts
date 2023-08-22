import { Component } from '@angular/core';
import { Cup } from './models/cup.model';

// interface Cup {
//   name: string;
//   description: string;
//   origin: string;
//   image: string;
//   price?: number;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public title: string = 'Fanaticups';
  public inputVar: string = "";
  public listOfCups: Cup[] = [
    {
      name: "Mushroom",
      description: "Mushroom style mug, with dots on top",
      origin: "Fance",
      image: "assets/images/cup1.jpg"
    },
    {
      name: "Mario Bros.",
      description: "Mario Bros paint on surface",
      origin: "EEUU",
      image: "assets/images/cup2.jpg"
    }
  ];


  public changeTitle(){
    this.title = "Fanaticups".toUpperCase();
  }

  public removeCup(id: number) {
    this.listOfCups.splice(id, 1);
  }


}
