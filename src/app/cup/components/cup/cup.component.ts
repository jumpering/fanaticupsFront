import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cup } from '@cup/models/cup.model';
import { User } from '@cup/models/user.model';
import { AuthService } from '@auth/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cup',
  templateUrl: './cup.component.html',
  styleUrls: ['./cup.component.scss']
})
export class CupComponent implements OnInit {

  public isLogged!: boolean;
  //public image!: File;
  //public blob!: Blob;
  public cupImage: string = 'http://localhost:8080/images/';

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.authService.hasSession().subscribe(logged => this.isLogged = logged);
    
    const image = this.cup!.image?.toString();
    this.cupImage = this.cupImage.concat(image!).replace('assets/images/', '');


    // const path = 'http://localhost:8080/files/' + this.authService.getId().toString();
    // this.http.get(path).subscribe((data) => {
    //   this.blob = new Blob([data], {type: 'application/pdf'});
    // });
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
