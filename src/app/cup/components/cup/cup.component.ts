import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cup } from '@cup/models/cup.model';
import { AuthService } from '@auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BreakpointService } from 'src/app/utils/breakpoint.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cup',
  templateUrl: './cup.component.html',
  styleUrls: ['./cup.component.scss']
})
export class CupComponent implements OnInit {

  public isLogged!: boolean;
  //public cupImage: string = 'http://localhost:8080/images/';
  //public cupImage: string = 'https://fanaticupsback.onrender.com/files/';
  //public cupImage: string = 'https://5.250.190.45/images/';
  public cupImage: string = 'https://images.fanaticups.org/images/';

  public isHandset$!: Observable<boolean>;
  @Input() cup!: Cup;
  @Output() buy = new EventEmitter<number>();
  @Output() detail = new EventEmitter<number>();

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private breakpointService: BreakpointService
  ) { }

  ngOnInit(): void {
    this.authService.hasSession().subscribe(logged => this.isLogged = logged);
    const image = this.cup!.image?.toString();
    this.cupImage = this.cupImage.concat(image!).replace('assets/images/', '');
    this.isHandset$ = this.breakpointService.isHandset$;
  }

  viewDescription() {
    this.buy.emit(this.cup.id);
  }

  showDetail() {
    this.detail.emit(this.cup.id);
  }

}
