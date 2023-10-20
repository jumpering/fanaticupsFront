import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cup } from '@cup/models/cup.model';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-cup',
  templateUrl: './cup.component.html',
  styleUrls: ['./cup.component.scss']
})
export class CupComponent implements OnInit {

  public isLogged!: boolean;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    //this.authService.hasSession().subscribe(logged => this.isLogged = logged);
  }

  @Input() cup!: Cup;
  @Input() ownerName!: string;
  @Output() buy = new EventEmitter<number>();
  @Output() detail = new EventEmitter<number>();
 
  viewDescription(){
    this.buy.emit(this.cup.id);
  }

  showDetail(){
    this.detail.emit(this.cup.id);
  }

  getOwner(): string{
    //return this.ownerName;
    return this.cup.owner;
  }

}
