import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cup } from '@cup/models/cup.model';
import { AuthService } from '@auth/services/auth.service';
import { BreakpointService } from 'src/app/utils/breakpoint.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cup',
  templateUrl: './cup.component.html',
  styleUrls: ['./cup.component.scss']
})
export class CupComponent implements OnInit {

  public isLogged!: boolean;
  public cupImage: string = '';
  public isHandset$!: Observable<boolean>;
  @Input() cup!: Cup;
  @Output() buy = new EventEmitter<number>();
  @Output() detail = new EventEmitter<number>();

  constructor(
    private authService: AuthService,
    private breakpointService: BreakpointService,

  ) { }

  ngOnInit(): void {
    this.isHandset$ = this.breakpointService.isHandset$;
    this.authService.hasSession().subscribe(logged => this.isLogged = logged);
    this.cupImage = this.cup!.image?.toString()!;
  }

  viewDescription() {
    this.buy.emit(this.cup.id);
  }

  showDetail() {
    this.detail.emit(this.cup.id);
  }

}
