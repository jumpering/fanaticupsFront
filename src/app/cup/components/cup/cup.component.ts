import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cup } from '@cup/models/cup.model';
import { AuthService } from '@auth/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cup',
  templateUrl: './cup.component.html',
  styleUrls: ['./cup.component.scss']
})
export class CupComponent implements OnInit {

  public isLogged!: boolean;
  public cupImage: string = 'http://localhost:8080/images/';

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.authService.hasSession().subscribe(logged => this.isLogged = logged);
    
    const image = this.cup!.image?.toString();
    this.cupImage = this.cupImage.concat(image!).replace('assets/images/', '');
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
