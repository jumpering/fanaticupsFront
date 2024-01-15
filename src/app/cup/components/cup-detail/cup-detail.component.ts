import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CupService } from '@cup/services/cup.service'
import { Cup } from '@cup/models/cup.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../cup-delete-dialog/delete-dialog.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-cup-detail',
  templateUrl: './cup-detail.component.html',
  styleUrls: ['./cup-detail.component.scss']
})
export class CupDetailComponent implements OnInit {

  public cup!: Cup;
  public cupImage: string = 'http://localhost:8080/images/';
  public updateFields: boolean = false;
  public isSmallScreen: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cupService: CupService,
    private router: Router,
    private matDialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        const id: number = params['id'];
        this.cupService.getById(id)
        .subscribe(element => {
          this.cup = element;
          const image = element.image?.toString();
          this.cupImage = this.cupImage.concat(image!);
        });
      });
      this.breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ]).subscribe(result => {
        const breakpoints = result.breakpoints;
        if (breakpoints[Breakpoints.Small] || breakpoints[Breakpoints.XSmall]){
          this.isSmallScreen = true;
        } else {
          this.isSmallScreen = false;
        }
      });
  }

  public openDeleteDialog(): void {
    // const dialogRef = this.matDialog.open(DeleteDialogComponent, {
      const dialogRef = this.matDialog.open(DeleteDialogComponent, {
      data: {cupName: this.cup.name}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined && result === true){
        console.log('es true, y deberia de borrar');
        this.cupService.delete(this.cup.id!);
      }
    });
  }

  private showDialog(message: string): void{

  }

  public editCup(): void{
       
  }

  toHome() {
    this.router.navigate(['/']);
  }

  onClickUpdateFields(): void {
    this.updateFields = true;
  }

  updateTitle(): void {
    alert('title updated on bd');
    this.updateFields = false;
  }

}
