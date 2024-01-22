import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CupService } from '@cup/services/cup.service'
import { Cup } from '@cup/models/cup.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../cup-delete-dialog/delete-dialog.component';
import { Observable } from 'rxjs';
import { BreakpointService } from 'src/app/utils/breakpoint.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/utils/customValidators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-cup-detail',
  templateUrl: './cup-detail.component.html',
  styleUrls: ['./cup-detail.component.scss']
})
export class CupDetailComponent implements OnInit {

  public cup!: Cup;
  public cupImage: string = 'http://localhost:8080/images/';
  public updateFields: boolean = false;
  public isHandset$!: Observable<boolean>;
  public file: File | null = null;
  public form!: FormGroup;
  public urlImage!: string;
  private extensionsPermited: string[] = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private cupService: CupService,
    private router: Router,
    private matDialog: MatDialog,
    private breakpointService: BreakpointService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.buildFormForUpdate();
  }

  buildFormForUpdate(): void {
    this.form = this.formBuilder.group({
      name: ['', //default
        [Validators.required, Validators.minLength(3)], //sync 
        [CustomValidators.existCupName(this.cupService)] //async
      ],
      //origin: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

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
    this.isHandset$ = this.breakpointService.isHandset$;
  }

  public openDeleteDialog(): void {
    const dialogRef = this.matDialog.open(DeleteDialogComponent, {
      data: { cupName: this.cup.name }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined && result === true) {
        console.log('es true, y deberia de borrar');
        this.cupService.delete(this.cup.id!);
      }
    });
  }

  toHome() {
    this.router.navigate(['/']);
  }

  onClickUpdateFields(): void {
    this.updateFields = true;
    this.form.get('name')?.setValue(this.cup.name);
    this.form.get('description')?.setValue(this.cup.description);
  }

  onClickSaveFields(): void {
    this.cup.name = this.form.get('name')?.value;
    this.cup.description = this.form.get('description')?.value;
    this.cup.image = this.file?.name.toString();
    this.cupService.updateFile(this.cup, this.file!).subscribe({
      next: (responseString) =>{
        console.log('Success file upload: ', responseString);
        this.cupService.updateCup(this.cup, this.file!).subscribe({
          next: (responseCup) => {
            console.log('response new cup name: ' + responseCup.name);
            this.updateFields = false;
          },
          error: (error) => {
            console.log('error: ' + error);
          }
        })
      },
      error: (error) =>{
        console.log('error: ' + error);
      }
    });
  }

  onClickCancelUpdate() {
    this.updateFields = false;
  }

  onSelectedFile(event: any): void {
    this.file = event.target.files[0];
    if (this.file && this.isImage()) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.urlImage = reader.result as string;
        this.cupImage = this.urlImage;
      };
      reader.readAsDataURL(this.file);
    } else {
      this.file = null;
      let messageExtensionsPrettyFormat: string = '';
      this.extensionsPermited.forEach(ext => {
        messageExtensionsPrettyFormat = messageExtensionsPrettyFormat.concat('*.' + ext + ` `);
      });
      this.showSnackBarMessage('Only ' + messageExtensionsPrettyFormat + ' files are supported.');
    }
  }

  private isImage(): boolean {
    const image = this.file?.name.split('.');
    const extension = image![(image!.length) - 1];
    return this.extensionsPermited.includes(extension);
  }

  private showSnackBarMessage(message: string): void {
    this.snackBar.open(message, '', { duration: 10000 });
  }

}
