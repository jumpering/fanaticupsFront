import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CupService } from '@cup/services/cup.service'
import { Cup } from '@cup/models/cup.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/message/components/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-cup-detail',
  templateUrl: './cup-detail.component.html',
  styleUrls: ['./cup-detail.component.scss']
})
export class CupDetailComponent implements OnInit {

  public cup!: Cup;
  public cupImage: string = 'http://localhost:8080/images/';

  constructor(
    private activatedRoute: ActivatedRoute,
    private cupService: CupService,
    private router: Router,
    private matDialog: MatDialog
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
  }

  public openDeleteDialog(): void {
    const dialogRef = this.matDialog.open(DeleteDialogComponent, {
      width: '300px',
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

}
