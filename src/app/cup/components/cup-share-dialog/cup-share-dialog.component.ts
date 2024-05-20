import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CupDetailComponent } from '../cup-detail/cup-detail.component';
import { MaterialModule } from '@material/material.module';
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-cup-share-dialog',
  standalone: true,
  imports: [MaterialModule, ShareButtonModule],
  templateUrl: './cup-share-dialog.component.html',
  styleUrl: './cup-share-dialog.component.scss'
})
export class CupShareDialogComponent {

  public cupURL!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CupDetailComponent>,
    library: FaIconLibrary
  ) {
    this.cupURL = data;
    library.addIconPacks(fas, fab);
  }

}
