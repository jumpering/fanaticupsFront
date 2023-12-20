import { Component, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CupDetailComponent } from '@cup/components/cup-detail/cup-detail.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CupDetailComponent>) { }

  ngOnInit(): void {
  }

  onClickYesOrNo(response: boolean): void {
    this.dialogRef.close(response);
  }

}
