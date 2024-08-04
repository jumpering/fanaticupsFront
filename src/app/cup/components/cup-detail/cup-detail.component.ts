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
import { UserService } from 'src/app/user/services/user.service';
import { CupShareDialogComponent } from '../cup-share-dialog/cup-share-dialog.component';

@Component({
  selector: 'app-cup-detail',
  templateUrl: './cup-detail.component.html',
  styleUrls: ['./cup-detail.component.scss']
})
export class CupDetailComponent implements OnInit {

  public cup!: Cup;
  public cupImage: string = '';
  public showProgressBar: boolean = false;
  public updateFields: boolean = false;
  public isHandset$!: Observable<boolean>;
  public isMedium$!: Observable<boolean>;
  public isSmall$!: Observable<boolean>;
  public file: File | null = null;
  public form!: FormGroup;
  public urlImage!: string;
  private extensionsPermited: string[] = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  public hasSession$!: Observable<boolean>;
  public isFavoriteForCurrentUser: boolean = false;
  private originalCupImage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private cupService: CupService,
    private router: Router,
    private matDialog: MatDialog,
    private breakpointService: BreakpointService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private userService: UserService
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
      description: ['', [Validators.required, Validators.maxLength(250)]],
    });
    this.form.markAllAsTouched();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
        const id: number = params['id'];
        this.cupService.getById(id)
          .subscribe(element => {
            this.cup = element;
            this.cupImage = element.image?.toString()!;
            this.originalCupImage = this.cupImage;
            this.userService.isFavorite(this.cup.id!).subscribe(result => {
              this.isFavoriteForCurrentUser = result;
            })
          });
      });
    this.isHandset$ = this.breakpointService.isHandset$;
    this.isMedium$ = this.breakpointService.isMedium$;
    this.isSmall$ = this.breakpointService.isSmall$; 

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

  onClickSetFavorite():void {
    const cupId: number | undefined = this.cup.id;
    this.userService.setCupToFavorite(cupId!).subscribe(addedToFavorites => {
        if(addedToFavorites){
          this.snackBar.open('Added to your favorite list', '', { duration: 5000 });
        } else {
          this.snackBar.open('Removed to your favorite list', '', { duration: 5000 });
        }
        this.userService.isFavorite(this.cup.id!).subscribe(response => {
          this.isFavoriteForCurrentUser = response;
        });
      }
    );
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
    const position: number = this.cupImage?.lastIndexOf('/');
    this.cup.image = this.cupImage.substring(position + 1);
    this.showProgressBar = true;
    this.cupService.updateCup(this.cup, this.file!).subscribe({
              next: (responseCup) => {
                console.log('cup uploaded! ' + responseCup.name);
                this.updateFields = false;
                this.showProgressBar = false;
              },
              error: (error) => {
                console.log('Error uploading cup and/or  file: ' + error);
                this.showProgressBar = false;
              }
            });
  }

  onClickCancelUpdate() {
    this.updateFields = false;
    this.cupImage = this.originalCupImage;
    this.file = null;
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

  public onClickShare(){
    const dialogRef = this.matDialog.open(CupShareDialogComponent, {
      data: { cupURL: this.router.url }
    });
  }
}
