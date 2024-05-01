import { Component, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';
import { BreakpointService } from 'src/app/utils/breakpoint.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public isActiveMessage = true;
  public isHandset$!: Observable<boolean>;

  constructor(private breakpointService: BreakpointService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isHandset$ = this.breakpointService.isHandset$;
    this.authService.hasSession().subscribe(value => {
      if(!value){
        localStorage.clear();
      }
    })
  }

  handleChildEvent(event: boolean) {
    this.isActiveMessage = event;
  }

}
