import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '@material/material.module';
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { BreakpointService } from 'src/app/utils/breakpoint.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-cup-share-dialog',
  standalone: true,
  imports: [MaterialModule, ShareButtonModule, CommonModule],
  templateUrl: './cup-share-dialog.component.html',
  styleUrl: './cup-share-dialog.component.scss'
})
export class CupShareDialogComponent implements OnInit{

  public isHandset$!: Observable<boolean>;
  public isMedium$!: Observable<boolean>;
  public isSmall$!: Observable<boolean>;

  constructor(
    public library: FaIconLibrary,
    private breakpointService: BreakpointService,
  ) {
    library.addIconPacks(fas, fab);
  }
  ngOnInit(): void {
    this.isHandset$ = this.breakpointService.isHandset$;
    this.isMedium$ = this.breakpointService.isMedium$;
    this.isSmall$ = this.breakpointService.isSmall$; 
  }

}
