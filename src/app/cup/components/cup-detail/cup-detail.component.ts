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
import { AuthService } from '@auth/services/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-cup-detail',
  templateUrl: './cup-detail.component.html',
  styleUrls: ['./cup-detail.component.scss']
})
export class CupDetailComponent implements OnInit {

  public cup!: Cup;
  public cupImage: string = environment.images;

  public updateFields: boolean = false;
  public isHandset$!: Observable<boolean>;
  public file: File | null = null;
  public form!: FormGroup;
  public urlImage!: string;
  private extensionsPermited: string[] = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  public hasSession$!: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cupService: CupService,
    private router: Router,
    private matDialog: MatDialog,
    private breakpointService: BreakpointService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.buildFormForUpdate();
    this.hasSession$ = this.authService.hasSession();
  }

  buildFormForUpdate(): void {
    this.form = this.formBuilder.group({
      name: ['', //default
        [Validators.required, Validators.minLength(3)], //sync 
        //[CustomValidators.existCupName(this.cupService)] //async (in keyup event http with method onCupNameChange())
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


  public onCupNameChange(): void {
    if (this.form.get('name')?.value.toLowerCase() === this.cup.name.toLowerCase()) {
      this.form.get('name')?.clearAsyncValidators();
      this.form.get('name')?.updateValueAndValidity();
    } else {
      this.form.get('name')?.setAsyncValidators(CustomValidators.existCupName(this.cupService));
      this.form.get('name')?.updateValueAndValidity();
    }
  }
  public openDeleteDialog(): void {
    const dialogRef = this.matDialog.open(DeleteDialogComponent, {
      data: { cupName: this.cup.name }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined && result === true) {
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
    const oldCupName: string = this.cup.name;
    const newCupName: string = this.form.get('name')?.value;
    this.cup.name = newCupName;
    this.cup.description = this.form.get('description')?.value;
    if (this.file == null) {
      const cupImageWithoutURL = this.cup.image?.split('/');
      const length: number | undefined = cupImageWithoutURL?.length;
      this.cup.image = cupImageWithoutURL![length! - 1];
      this.cupService.updatePath(oldCupName, newCupName).subscribe();
    } else {
      this.cup.image = this.file?.name.toString();
      this.cupService.updatePathAndFile(this.cup, this.file!).subscribe();
    }
    this.cupService.updateCup(this.cup).subscribe({
      next: (responseCup) => {
        this.updateFields = false;
      },
      error: (error) => {
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

  public isCupOwner(): boolean {
    return this.cup.user?.id === this.authService.getId();
  }
}
