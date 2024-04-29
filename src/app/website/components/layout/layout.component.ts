import { Component, Input, OnInit, Output } from '@angular/core';
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

  constructor(private breakpointService: BreakpointService,) { }

  ngOnInit(): void {
    this.isHandset$ = this.breakpointService.isHandset$;
  }

  handleChildEvent(event: boolean) {
    this.isActiveMessage = event;
  }

}
