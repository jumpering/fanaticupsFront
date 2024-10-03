import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cup } from '@cup/models/cup.model';
import { CupService } from '@cup/services/cup.service';
import { CustomValidators } from 'src/app/utils/customValidators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointService } from 'src/app/utils/breakpoint.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category/services/category.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public file: File | null = null;
  public form!: FormGroup;
  public urlImage!: string;
  private extensionsPermited: string[] = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'JPG', 'JPEG', 'PNG', 'GIF', 'WEBP'];
  private maximumFileSize: number = 5000000;
  public isHandset$!: Observable<boolean>;
  public showProgressBar: boolean = false;
  public selectedCategoriesIndex: number[] = [];
  public showLoading: boolean = false;

  constructor(
    private cupService: CupService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private breakpointService: BreakpointService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.isHandset$ = this.breakpointService.isHandset$;
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['', //default name
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)], //sync 
        [CustomValidators.existCupName(this.cupService)] //async
      ],
      origin: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
       price: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]]
    });
  }

  onSelectedFile(event: any) {
    this.file = event.target.files[0];
    if(this.file && this.file?.size > this.maximumFileSize){
      this.file = null;
      this.showSnackBarMessage('Error: Maximum image size is ' + this.maximumFileSize / 1000000 + 'MB.');
    }


    else if (this.file && this.isImage()) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.urlImage = reader.result as string;
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

  onCreateCup() {
    this.showLoading = true;
    const cup: Cup = {
      name: this.form.get('name')?.value,
      origin: this.form.get('origin')?.value,
      description: this.form.get('description')?.value,
      price: this.form.get('price')?.value,
      image: this.file?.name.toString()
    };
    this.showProgressBar = true;
    this.cupService.create(cup, this.file!).subscribe({
      next: (resultCup) => {
        const responseCup: Cup = resultCup;
        this.categoryService.addCategoriesToCupId(responseCup.id!, this.selectedCategoriesIndex).subscribe({
          next: (response) =>{
            console.log("categories created");
            this.showLoading = false;
          },
          error: (error) => {
            console.log("error creating categories: ");
          }
        });
        this.showProgressBar = false;
        this.router.navigate(['/' + responseCup.id]);
      },
      error: (error) => {
        console.log(error);
        this.showProgressBar = false;
      }
    });
  }

  onCupFieldChange(inputField: string) {
    this.form.get(inputField)?.markAsTouched();
  }

  onCategoriesSelected(categoriesIndexs: number[]){
    this.selectedCategoriesIndex = categoriesIndexs;
  }

  onPriceInput(event: any){
    const input = event.target;
    input.value = input.value.replace(',', '.');
    this.form.get('price')?.setValue(input.value);
  }
}
