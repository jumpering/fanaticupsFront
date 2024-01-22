import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cup } from '@cup/models/cup.model';
import { CupService } from '@cup/services/cup.service';
import { AuthService } from '@auth/services/auth.service';
import { CustomValidators } from 'src/app/utils/customValidators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public file: File | null = null;
  public form!: FormGroup;
  public urlImage!: string;
  private extensionsPermited: string[] = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

  constructor(
    private cupService: CupService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm(){
    this.form = this.formBuilder.group({
      name: ['', //default
            [Validators.required, Validators.minLength(3)], //sync 
            [CustomValidators.existCupName(this.cupService)] //async
          ],
      origin: ['',[Validators.required]],
      description: ['',[Validators.required]],
    });
  }

  onSelectedFile(event: any){
    this.file =  event.target.files[0];
    if (this.file && this.isImage()) {
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

  onCreateCup(){
    const cup: Cup = {
      name: this.form.get('name')?.value,
      origin: this.form.get('origin')?.value,
      description: this.form.get('description')?.value,
      image: this.file?.name.toString(),
    };
    //const userId: number = this.authService.getId();
    this.cupService.create(cup, this.file!);
  }

}
